import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { UserService } from 'src/app/service/user.service';
import { MateriaService } from 'src/app/service/materia.service';
import { NotaMateriaService } from 'src/app/service/notaMateria.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './config.component';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;

  beforeEach(() => {
    const agendamentoServiceStub = () => ({
      delete: idAgendamento => ({ toPromise: () => ({}) })
    });
    const userServiceStub = () => ({
      getAllInfosById: () => ({ subscribe: f => f({}) }),
      changePass: senha => ({ subscribe: f => f({}) }),
      edit: (nome, email) => ({ subscribe: f => f({}) }),
      delete: () => ({ subscribe: f => f({}) })
    });
    const materiaServiceStub = () => ({
      delete: idMateria => ({ toPromise: () => ({}) })
    });
    const notaMateriaServiceStub = () => ({
      delete: idNotaMateria => ({ toPromise: () => ({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfigComponent],
      providers: [
        { provide: AgendamentoService, useFactory: agendamentoServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: MateriaService, useFactory: materiaServiceStub },
        { provide: NotaMateriaService, useFactory: notaMateriaServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`passMinOk has default value`, () => {
    expect(component.passMinOk).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(component, 'alertError').and.callThrough();
      spyOn(userServiceStub, 'getAllInfosById').and.callThrough();
      component.ngOnInit();
      expect(component.alertError).toHaveBeenCalled();
      expect(userServiceStub.getAllInfosById).toHaveBeenCalled();
    });
  });

  describe('alterarSenha', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(component, 'alertSucess').and.callThrough();
      spyOn(component, 'alertError').and.callThrough();
      spyOn(userServiceStub, 'changePass').and.callThrough();
      component.alterarSenha();
      expect(component.alertSucess).toHaveBeenCalled();
      expect(component.alertError).toHaveBeenCalled();
      expect(userServiceStub.changePass).toHaveBeenCalled();
    });
  });

  describe('alterarInfos', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(component, 'alertSucess').and.callThrough();
      spyOn(component, 'alertError').and.callThrough();
      spyOn(userServiceStub, 'edit').and.callThrough();
      component.alterarInfos();
      expect(component.alertSucess).toHaveBeenCalled();
      expect(component.alertError).toHaveBeenCalled();
      expect(userServiceStub.edit).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('makes expected calls', () => {
      const agendamentoServiceStub: AgendamentoService = fixture.debugElement.injector.get(
        AgendamentoService
      );
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      const materiaServiceStub: MateriaService = fixture.debugElement.injector.get(
        MateriaService
      );
      const notaMateriaServiceStub: NotaMateriaService = fixture.debugElement.injector.get(
        NotaMateriaService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(component, 'alertSucess').and.callThrough();
      spyOn(component, 'alertError').and.callThrough();
      spyOn(agendamentoServiceStub, 'delete').and.callThrough();
      spyOn(userServiceStub, 'delete').and.callThrough();
      spyOn(materiaServiceStub, 'delete').and.callThrough();
      spyOn(notaMateriaServiceStub, 'delete').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.deleteUser();
      expect(component.alertSucess).toHaveBeenCalled();
      expect(component.alertError).toHaveBeenCalled();
      expect(agendamentoServiceStub.delete).toHaveBeenCalled();
      expect(userServiceStub.delete).toHaveBeenCalled();
      expect(materiaServiceStub.delete).toHaveBeenCalled();
      expect(notaMateriaServiceStub.delete).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
