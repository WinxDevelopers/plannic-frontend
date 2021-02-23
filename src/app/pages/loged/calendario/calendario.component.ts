import { ViewChild, Component, OnInit } from '@angular/core';
import { FullCalendarComponent, CalendarOptions, Calendar } from '@fullcalendar/angular'; 

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 600,
    themeSystem: 'bootstrap'
  };

  someMethod() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
  }

}
