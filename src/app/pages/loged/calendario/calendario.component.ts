import { ViewChild, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import allLocales from '@fullcalendar/core/locales-all';
import { UserService } from 'src/app/service/user.service';
import { Agendamento } from 'src/app/interface/agendamento';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locales: allLocales,
    locale: localStorage.getItem('lang') || 'pt-BR'

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  constructor(private usuarioService: UserService) { }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.usuarioService.getAllById().subscribe(
      (stringData: string) => {
        let data = JSON.parse(stringData)
        data = data[0]
        console.log(data.agendamentos)
        this.calendarOptions.events = data.agendamentos.map((ag) => {
          ag = ag as Agendamento;
          let mat;
          data.materias.forEach((m)=>{
            if(m.idMateria===ag.idMateria)
              mat = m.nomeMateria;
          })
          console.log(ag.recorrenciaInicio.slice(0,10))
          return {
            start: ag.recorrenciaInicio.slice(0,11)+ag.horaInicio,
            end: ag.recorrenciaFim.slice(0,11)+ag.horaFim,            
            title: mat
            //allDay: true||false
            //groupId: StringConstructor
          }
        })
      })
  }

  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    let lg = localStorage.getItem('lang');
    let title;
    if (lg == 'pt-BR') {
      title = prompt('Digite o nome do evento.');
    }
    else {
      title = prompt('Please enter a new title for your event');
    }
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    let lg = localStorage.getItem('lang');
    if (lg == 'pt-BR') {
      if (confirm(`Deseja excluir esse evento - '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }
    }
    else {
      if (confirm(`Are you sure you want to delete the event - '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
