import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import allLocales from '@fullcalendar/core/locales-all';
import { UserService } from 'src/app/service/user.service';
import { Agendamento } from 'src/app/interface/agendamento';
import Swal from 'sweetalert2'
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { Materia } from 'src/app/interface/materia';
import { add } from 'date-fns'

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
  recorrenciaInicio;
  recorrenciaFim;
  metodos = ["Autoexplicação", "Resumo", "Teste Prático", "Técnica Pomodoro", "Mapa Mental", "Outro"]
  recorrencias = ["Nunca", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"]
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
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
    private agendamentoService: AgendamentoService
  ) { }

  currentEvents: EventApi[] = [];

  ngOnInit(): void {
    this.refresh();
  }

  /* CRUD AGENDAMENTO */

  camposVal:boolean = true;
  
  save() {
    this.camposVal = true;
    //Caso a hora inicial seja maior q a final
    if (parseInt(this.newForm.horaInicio.slice(0, 2)) > parseInt(this.newForm.horaFim.slice(0, 2))) {
      this.newForm.dataFim = this.newForm.dataInicio.slice(0, 8) + (parseInt(this.newForm.dataInicio.slice(8, 10))+1).toString();
    } else {
      this.newForm.dataFim = this.newForm.dataInicio;
    }

    if(
      this.newForm.recorrencia &&
      this.newForm.tipoEstudo &&
      this.newForm.idMateria &&
      this.newForm.dataInicio &&
      this.newForm.horaInicio &&
      this.newForm.dataFim &&
      this.newForm.horaFim
    ){
      this.agendamentoService.create(
        this.newForm.idMateria,
        this.newForm.dataInicio + "T12:00:00",
        this.newForm.dataFim + "T12:00:00",
        this.newForm.recorrencia,
        this.newForm.horaInicio,
        this.newForm.horaFim,
        this.newForm.metodo,
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
          this.refresh()
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
    }else{
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

  del(idAgendamento){
    console.log(idAgendamento)
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
    this.newForm = {}
    this.editForm = {}
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

}
