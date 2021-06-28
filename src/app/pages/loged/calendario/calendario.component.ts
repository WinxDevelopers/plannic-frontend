import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import allLocales from '@fullcalendar/core/locales-all';
import { UserService } from 'src/app/service/user.service';
import { Agendamento } from 'src/app/interface/agendamento';
import Swal from 'sweetalert2';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { MateriaService } from 'src/app/service/materia.service';
import { Materia } from 'src/app/interface/materia';
import { add } from 'date-fns';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  lang = localStorage.getItem('lang');

  calendarVisible = true;
  materias: Materia[] = [];
  newForm: any = {
    recorrencia: null,
    tipoEstudo: null,
    idMateria: null,
    dataInicio: null,
    horaInicio: null,
    dataFim: null,
    horaFim: null,
  };
  editForm: any = {
    recorrencia: null,
    tipoEstudo: null,
    idMateria: null,
    dataInicio: null,
    horaInicio: null,
    dataFim: null,
    horaFim: null,
    notificacao: null
  };
  recorrenciaInicio;
  recorrenciaFim;
  recorrencia = {
    disable: true,
    vezes: 1,
    repeticao: "dia"
  };
  notificacao = {
    disable: true,
    tempo: 1,
    medida: "dia"
  };

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    selectAllow: function (e) {
      if (e.end.getTime() / 1000 - e.start.getTime() / 1000 <= 86400) {
        return true;
      }
    },
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    droppable: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locales: allLocales,
    locale: localStorage.getItem('lang') || 'pt-BR'
  };

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(
    private usuarioService: UserService,
    private agendamentoService: AgendamentoService,
    public materiaService: MateriaService,
  ) { }

  currentEvents: EventApi[] = [];

  ngOnInit(): void {
    this.refresh();
  }

  /* CRIAR MATERIA PELO SELECT */
  async criarMateria(nomeMateria: any) {
    this.materiaService.create(1, nomeMateria, "Sem Descrição").subscribe(
      () => { this.refresh() },
      error => {
        if (localStorage.getItem("lang") != "en") {
          this.Toast.fire({
            icon: 'error',
            title: 'Ocorreu um erro'
          })
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'An error has occurred'
          })
        }
      }
    )
  }

  /* CRUD AGENDAMENTO */
  camposVal: boolean = true;
  dateVal: boolean = true;
  recorVal: boolean = true;

  save(form) {
    if (
      form.recorrencia &&
      form.tipoEstudo &&
      form.idMateria &&
      form.dataInicio &&
      form.horaInicio &&
      form.dataFim &&
      form.horaFim
    ) {
      this.agendamentoService.create(
        form.idMateria,
        form.dataInicio + "T12:00:00",
        form.dataFim + "T12:00:00",
        form.recorrencia,
        form.horaInicio,
        form.horaFim,
        form.tipoEstudo,
      ).subscribe(
        () => {
          document.getElementById("close").click();
          if (localStorage.getItem("lang") != "en") {
            this.Toast.fire({
              icon: 'success',
              title: 'Agendamento Salvo'
            })
          } else {
            this.Toast.fire({
              icon: 'error',
              title: 'Schedule saved'
            })
          }
          this.refresh();
        },
        error => {
          if (localStorage.getItem("lang") != "en") {
            this.Toast.fire({
              icon: 'error',
              title: 'Ocorreu um erro'
            })
          } else {
            this.Toast.fire({
              icon: 'error',
              title: 'An error has occurred'
            })
          }
        }
      );
    } else {
      this.camposVal = false;
    }
  }

  edit() {
    this.recorrenciaInicio = this.editForm.dataInicio + "T12:00:00"
    this.recorrenciaFim = this.editForm.dataFim + "T12:00:00"
    this.agendamentoService.update(
      this.editForm.idAgendamento,
      this.editForm.idMateria,
      this.recorrenciaInicio,
      this.recorrenciaFim,
      this.editForm.recorrencia,
      this.editForm.horaInicio,
      this.editForm.horaFim,
      this.editForm.tipoEstudo
    ).subscribe(
      () => {
        this.refresh()
        if (localStorage.getItem("lang") != "en") {
          this.Toast.fire({
            icon: 'success',
            title: 'Agendamento alterado'
          })
        } else {
          this.Toast.fire({
            icon: 'success',
            title: 'Schedule changed'
          })
        }
      },
      error => {
        if (localStorage.getItem("lang") != "en") {
          this.Toast.fire({
            icon: 'error',
            title: 'Ocorreu um erro'
          })
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'An error has occurred'
          })
        }
      }
    );
  }

  del(idAgendamento) {
    if (localStorage.getItem('lang') === "pt-BR") {
      return Swal.fire({
        title: 'Tem certeza?',
        text: `A operação não pode ser desfeita`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
          this.agendamentoService.delete(idAgendamento).subscribe(
            () => {
              document.getElementById("close").click();
              this.Toast.fire({
                icon: 'success',
                title: 'Agendamento deletado'
              })
              this.refresh();
            },
            err => {
              this.Toast.fire({
                icon: 'error',
                title: 'Ocorreu um erro'
              })
            }
          );
        }
      })
    } else {
      return Swal.fire({
        title: 'Are you sure?',
        text: `The operation cannot be undone`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.agendamentoService.delete(idAgendamento).subscribe(
            () => {
              document.getElementById("close").click();
              this.Toast.fire({
                icon: 'success',
                title: 'Schedule deleted'
              })
              this.refresh();
            },
            err => {
              this.Toast.fire({
                icon: 'error',
                title: 'An error has occurred'
              })
            }
          );
        }
      })
    }
  }

  /* CALENDÁRIO */
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleDateSelect(selectedDate: DateSelectArg) {
    let hj = new Date();
    if (selectedDate.start > hj) {
      this.newForm.dataInicio = this.DateToString(selectedDate.start, "data");
    } else {
      this.newForm.dataInicio = this.DateToString(hj, "data");
    }
    hj = add(hj, { hours: 1 })
    this.newForm.horaInicio = this.DateToString(hj, "hora");
    hj = add(hj, { hours: 1 })
    this.newForm.horaFim = this.DateToString(hj, "hora");
    document.getElementById("botaocriar").click();
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleEventClick(clickInfo: EventClickArg) {
    let event = clickInfo.event.toJSON()
    this.setInfos(event)
    document.getElementById("botaoeditar").click()
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  /* FUNÇÕES AUXILIARES */

  countAgendamento() {
    this.camposVal = true;
    this.dateVal = true;
    this.recorVal = true;

    //Declarando notificação
    this.newForm.notificacao = this.notificacao.disable ? "N" : `${this.notificacao.tempo}_${this.notificacao.medida}`;

    //Caso a hora inicial seja maior q a final
    if (parseInt(this.newForm.horaInicio.slice(0, 2)) > parseInt(this.newForm.horaFim.slice(0, 2))) {
      this.newForm.dataFim = this.newForm.dataInicio.slice(0, 8) + (parseInt(this.newForm.dataInicio.slice(8, 10)) + 1).toString();
    } else {
      this.newForm.dataFim = this.newForm.dataInicio;
    }


    if (
      new Date(
        parseInt(this.newForm.dataInicio.slice(0, 4)), //Ano
        parseInt(this.newForm.dataInicio.slice(5, 7)) - 1, //Mes
        parseInt(this.newForm.dataInicio.slice(8, 10)), //Dia
        parseInt(this.newForm.horaInicio.slice(0, 2)), //Hora
        parseInt(this.newForm.horaInicio.slice(3, 6)), //Minuto
      )
      < new Date()) {
      this.dateVal = false;
      return;
    }

    if (!this.newForm.idMateria) {
      document.getElementsByTagName("ng-select")[0].classList.add("ng-invalid");
    }

    if (this.recorrencia.disable) {
      this.newForm.recorrencia = "N";
      this.save(this.newForm);
    } else {
      if (this.recorrencia.vezes < 0) {
        this.recorVal = false
        return;
      }
      let form = this.newForm;
      let dataInicio = new Date(
        parseInt(this.newForm.dataInicio.slice(0, 4)), //Ano
        parseInt(this.newForm.dataInicio.slice(5, 7)) - 1, //Mes
        parseInt(this.newForm.dataInicio.slice(8, 10)), //Dia
        parseInt(this.newForm.horaInicio.slice(0, 2)), //Hora
        parseInt(this.newForm.horaInicio.slice(3, 6)), //Minuto
      );
      let dataFim = new Date(
        parseInt(this.newForm.dataFim.slice(0, 4)), //Ano
        parseInt(this.newForm.dataFim.slice(5, 7)) - 1, //Mes
        parseInt(this.newForm.dataFim.slice(8, 10)), //Dia
        parseInt(this.newForm.horaFim.slice(0, 2)), //Hora
        parseInt(this.newForm.horaFim.slice(3, 6)), //Minuto
      );
      let loop = this.recorrencia.vezes > 0 ? this.recorrencia.vezes : 0
      for (let i = 0; i <= loop; i++) {
        if (this.recorrencia.repeticao === "dia") {
          form.recorrencia = "dia";
          form.dataInicio = this.DateToString(add(dataInicio, { days: i }), "data");
          form.dataFim = this.DateToString(add(dataFim, { days: i }), "data");
          this.save(form);
        }
        if (this.recorrencia.repeticao === "semana") {
          form.recorrencia = "semana";
          form.dataInicio = this.DateToString(add(dataInicio, { weeks: i }), "data");
          form.dataFim = this.DateToString(add(dataFim, { weeks: i }), "data");
          this.save(form);
        }
        if (this.recorrencia.repeticao === "mes") {
          form.recorrencia = "mes";
          form.dataInicio = this.DateToString(add(dataInicio, { months: i }), "data");
          form.dataFim = this.DateToString(add(dataFim, { months: i }), "data");
          this.save(form);
        }
      }
    }
  }

  refresh() {
    this.usuarioService.getAllInfosById().subscribe(
      (stringData: string) => {
        let data = JSON.parse(stringData)
        data = data[0]
        data.agendamentos = data.agendamentos.filter((ag)=>{
          let mat = undefined;
          data.materias.forEach((m) => {
            if (m.idMateria === ag.idMateria)
              mat = { nome: m.nomeMateria, descricao: m.descricao };
          })
          if (!mat) return;
          ag.mat = {
            nome: mat.nome,
            descricao: mat.descricao
          }
          return ag;
        })
        this.materias = data.materias;
        this.calendarOptions.events = data.agendamentos.map((ag) => {
          ag = ag as Agendamento;          
          return {
            start: ag.recorrenciaInicio.slice(0, 11) + ag.horaInicio,
            end: ag.recorrenciaFim.slice(0, 11) + ag.horaFim,
            title: ag.mat.nome,
            id: ag.idAgendamento,
            recorrencia: ag.recorrencia,
            idMateria: ag.idMateria,
            idAgendamento: ag.idAgendamento,
            tipoEstudo: ag.tipoEstudo,
            descricao: ag.mat.descricao
            //allDay: true||false
            //groupId: StringConstructor
          }
        })
      })
  }

  modal = {
    anterior: null,
    seguinte: null
  };

  changeModal(to, from) {
    if (to === "metodos") {
      document.getElementById("modal-dialog").classList.add("modal-dialog-scrollable")
    } else {
      document.getElementById("modal-dialog").classList.remove("modal-dialog-scrollable")
    }
    this.modal.seguinte = to;
    this.modal.anterior = from;
  }

  closeModal() {
    this.camposVal = true;
    this.dateVal = true;
    this.recorVal = true;
    this.newForm = {};
    this.editForm = {};
    this.recorrencia = {
      disable: true,
      vezes: 1,
      repeticao: "dia"
    };
    this.notificacao = {
      disable: true,
      tempo: 1,
      medida: "dia"
    };
  }

  DateToString(data: Date, type) {
    if (type === "data") {
      let dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(),
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
      return anoF + "-" + mesF + "-" + diaF;
    } else {
      return ((data.getHours() < 10 ? '0' + data.getHours() : data.getHours()) + ":" + ((data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes())))
    }
  }

  setInfos(event) {
    if (event) {
      this.editForm = {
        recorrencia: event.extendedProps.recorrencia,
        tipoEstudo: event.extendedProps.tipoEstudo,
        idAgendamento: event.extendedProps.idAgendamento,
        idMateria: event.extendedProps.idMateria,
        dataInicio: this.DateToString(new Date(event.start), "data"),
        horaInicio: this.DateToString(new Date(event.start), "hora"),
        dataFim: this.DateToString(new Date(event.end), "data"),
        horaFim: this.DateToString(new Date(event.end), "hora")
      };
    }
  }

  setMetodo(event) {
    let tipo = (event.target as Element).id;

    if (this.modal.anterior === "create") {
      this.newForm.tipoEstudo = tipo;
    }
    if (this.modal.anterior === "edit") {
      this.editForm.tipoEstudo = tipo;
    }
    document.getElementById("from_metodos").click();
  }
}
