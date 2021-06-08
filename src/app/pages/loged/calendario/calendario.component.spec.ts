import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateSelectArg } from '@fullcalendar/angular';
import { EventClickArg } from '@fullcalendar/angular';
import { UserService } from 'src/app/service/user.service';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { MateriaService } from 'src/app/service/materia.service';
import { FormsModule } from '@angular/forms';
import { CalendarioComponent } from './calendario.component';

describe('CalendarioComponent', () => {
  let component: CalendarioComponent;
  let fixture: ComponentFixture<CalendarioComponent>;

  beforeEach(() => {
    const userServiceStub = () => ({
      getAllInfosById: () => ({ subscribe: f => f({}) })
    });
    const agendamentoServiceStub = () => ({
      create: (
        idMateria,
        arg,
        arg1,
        recorrencia,
        horaInicio,
        horaFim,
        tipoEstudo
      ) => ({ subscribe: f => f({}) }),
      update: (
        idAgendamento,
        idMateria,
        recorrenciaInicio,
        recorrenciaFim,
        recorrencia,
        horaInicio,
        horaFim,
        tipoEstudo
      ) => ({ subscribe: f => f({}) }),
      delete: idAgendamento => ({ subscribe: f => f({}) })
    });
    const materiaServiceStub = () => ({
      create: (nomeMateria, string) => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CalendarioComponent],
      providers: [
        { provide: UserService, useFactory: userServiceStub },
        { provide: AgendamentoService, useFactory: agendamentoServiceStub },
        { provide: MateriaService, useFactory: materiaServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CalendarioComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`calendarVisible has default value`, () => {
    expect(component.calendarVisible).toEqual(true);
  });

  it(`materias has default value`, () => {
    expect(component.materias).toEqual([]);
  });

  it(`currentEvents has default value`, () => {
    expect(component.currentEvents).toEqual([]);
  });

  it(`camposVal has default value`, () => {
    expect(component.camposVal).toEqual(true);
  });

  it(`dateVal has default value`, () => {
    expect(component.dateVal).toEqual(true);
  });

  it(`recorVal has default value`, () => {
    expect(component.recorVal).toEqual(true);
  });

  describe('handleDateSelect', () => {
    it('makes expected calls', () => {
      const dateSelectArgStub: DateSelectArg = <any>{};
      spyOn(component, 'DateToString').and.callThrough();
      component.handleDateSelect(dateSelectArgStub);
      expect(component.DateToString).toHaveBeenCalled();
    });
  });

  describe('handleEventClick', () => {
    it('makes expected calls', () => {
      const eventClickArgStub: EventClickArg = <any>{};
      spyOn(component, 'setInfos').and.callThrough();
      component.handleEventClick(eventClickArgStub);
      expect(component.setInfos).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'refresh').and.callThrough();
      component.ngOnInit();
      expect(component.refresh).toHaveBeenCalled();
    });
  });

  describe('edit', () => {
    it('makes expected calls', () => {
      const agendamentoServiceStub: AgendamentoService = fixture.debugElement.injector.get(
        AgendamentoService
      );
      spyOn(component, 'refresh').and.callThrough();
      spyOn(agendamentoServiceStub, 'update').and.callThrough();
      component.edit();
      expect(component.refresh).toHaveBeenCalled();
      expect(agendamentoServiceStub.update).toHaveBeenCalled();
    });
  });

  describe('countAgendamento', () => {
    it('makes expected calls', () => {
      spyOn(component, 'save').and.callThrough();
      spyOn(component, 'DateToString').and.callThrough();
      component.countAgendamento();
      expect(component.save).toHaveBeenCalled();
      expect(component.DateToString).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'getAllInfosById').and.callThrough();
      component.refresh();
      expect(userServiceStub.getAllInfosById).toHaveBeenCalled();
    });
  });
});
