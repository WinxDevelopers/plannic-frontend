import { ViewChild, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import allLocales from '@fullcalendar/core/locales-all';
import { UserService } from 'src/app/service/user.service';
import { Agendamento } from 'src/app/interface/agendamento';
import Swal from 'sweetalert2'
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { Materia } from 'src/app/interface/materia';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

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
  };
  metodos = ["Autoexplicação", "Resumo", "Teste Prático", "Técnica Pomodoro", "Mapa Mental", "Outro"]
  recorrencias = ["Nunca", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"]
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
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
    private agendamentoService: AgendamentoService
  ) { }

  currentEvents: EventApi[] = [];

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.usuarioService.getAllById().subscribe(
      (stringData: string) => {
        let data = JSON.parse(stringData)
        data = data[0]
        this.materias = data.materias;
        this.calendarOptions.events = data.agendamentos.map((ag) => {
          ag = ag as Agendamento;
          let mat;
          data.materias.forEach((m) => {
            if (m.idMateria === ag.idMateria)
              mat = m.nomeMateria;
          })
          return {
            start: ag.recorrenciaInicio.slice(0, 11) + ag.horaInicio,
            end: ag.recorrenciaFim.slice(0, 11) + ag.horaFim,
            title: mat,
            id: ag.idAgendamento,
            recorrencia: ag.recorrencia,
            idMateria: ag.idMateria,
            idAgendamento: ag.idAgendamento,
            tipoEstudo: ag.tipoEstudo
            //allDay: true||false
            //groupId: StringConstructor
          }
        })
      })
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
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
      return data.getHours() + ":" + ((data.getMinutes() < 10 ? '0' : '') + data.getMinutes())
    }
  }

  edit() {    
    this.agendamentoService.update(
      this.editForm.idAgendamento,
      this.editForm.idMateria,
      new Date(this.editForm.dataInicio+"T"+this.editForm.horaInicio),
      new Date(this.editForm.dataFim+"T"+this.editForm.horaFim),
      this.editForm.recorrencia,
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
      error =>{
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

  closeModal() {
    this.newForm = {}
    this.editForm = {}
  }

  save() {
    let recorrenciaInicio = this.newForm.dataInicio + "T12:00:00"
    let recorrenciaFim = this.newForm.dataFim + "T12:00:00"
    this.agendamentoService.create(
      this.newForm.idMateria,
      recorrenciaInicio,
      recorrenciaFim,
      this.newForm.recorrencia,
      this.newForm.horaInicio,
      this.newForm.horaFim,
      this.newForm.metodo,
    ).subscribe(
      () => {
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
        this.refresh()},
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

  handleEventClick(clickInfo: EventClickArg) {
    let event = clickInfo.event.toJSON()
    let lg = localStorage.getItem('lang');
    this.setInfos(event)
    if (lg == 'pt-BR') {
      Swal.fire({
        title: `${clickInfo.event.title}`,
        showDenyButton: true,
        confirmButtonText: `<span (click)='editIndos(${clickInfo.event})' data-toggle="modal" data-target="#editarmateria">Editar</span>`,
        denyButtonText: `Excluir`
      }).then((result) => {
        if (result.isDenied) {
          Swal.fire({
            title: 'Deletar o agendamento?',
            text: 'Não será possível desfazer o processo',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            showDenyButton: true,
            confirmButtonText: `Sim`,
            denyButtonText: `Não`
          }).then((result) => {
            if (result.isConfirmed) {
              this.agendamentoService.delete(parseInt(clickInfo.event.id)).subscribe(
                () => {
                  if (localStorage.getItem("lang") != "en") {
                    this.Toast.fire({
                      icon: 'success',
                      title: 'Agendamento Deletado'
                    })
                  } else {
                    this.Toast.fire({
                      icon: 'success',
                      title: 'Schedule deleted'
                    })
                  }
                  this.refresh()
                },
                error =>{
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
                });
            }
          })
        }
      })
    }
    else {
      Swal.fire({
        title: `${clickInfo.event.title}`,
        showDenyButton: true,
        confirmButtonText: `<span (click)='editIndos(${clickInfo.event})' data-toggle="modal" data-target="#editarmateria">Edit</span>`,
        denyButtonText: `Delete`
      }).then((result) => {
        if (result.isDenied) {
          Swal.fire({
            title: 'Delete the schedule?',
            text: 'It is not possible to undo the process',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`
          }).then((result) => {
            if (result.isConfirmed) {
              this.agendamentoService.delete(parseInt(clickInfo.event.id)).subscribe(() => this.refresh());
            }
          })
        }
      })
    }
  }

  handleEvents(events: EventApi[]) {
    let dias = document.getElementsByClassName("fc-daygrid-day-number");
    for (let d = 0; d < dias.length; d++) {
      dias[d].setAttribute("data-toggle", "modal");
      dias[d].setAttribute("data-target", "#criarmateria");
      dias[d].setAttribute("onclick", `${this.setInfos(null)}`);
    }
    this.currentEvents = events;
  }

}
