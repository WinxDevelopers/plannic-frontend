import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { DateSelectArg } from '@fullcalendar/angular';
import { EventClickArg } from '@fullcalendar/angular';
import { UserService } from 'src/app/service/user.service';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { MateriaService } from 'src/app/service/materia.service';
import { FormsModule } from '@angular/forms';
import { CalendarioComponent } from './calendario.component';
import { TranslateModule } from '@ngx-translate/core';
import { off } from 'process';
import { of } from 'rxjs';

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
        notificacao,
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
        notificacao,
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
      createSugestao: sugestao => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, TranslateModule.forRoot()],
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
    
    component.newForm={
      recorrencia: '',
      tipoEstudo: '',
      idMateria: '',
      dataInicio: '202008121834',
      horaInicio: '202008121834',
      notificacao: "N",
      dataFim: '202008121834',
      horaFim: '202008121834',
    };
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

  it(`newSugestaoID has default value`, () => {
    expect(component.newSugestaoID).toEqual(undefined);
  });

  it(`camposVal has default value`, () => {
    expect(component.camposVal).toEqual(true);
  });

  it(`dateVal has default value`, () => {
    expect(component.dateVal).toEqual(true);
  });

  describe('handleDateSelect', () => {
    it('makes expected calls', () => {
      const dateSelectArgStub: DateSelectArg = <any>{};
      spyOn(component, 'DateToString').and.callThrough();
      component.handleDateSelect(dateSelectArgStub);
      expect(component.DateToString).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'refresh');
      component.ngOnInit();
      expect(component.refresh).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'getAllInfosById').and.returnValue(of(JSON.stringify({agendamentos: [{idMateria: '123'}]})));
      component.refresh();
      expect(userServiceStub.getAllInfosById).toHaveBeenCalled();
    });
  });
});
