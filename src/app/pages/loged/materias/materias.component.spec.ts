import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from './../../../service/user.service';
import { MateriaService } from './../../../service/materia.service';
import { NotaMateriaService } from 'src/app/service/notaMateria.service';
import { Swal } from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MateriasComponent } from './materias.component';

describe('MateriasComponent', () => {
  let component: MateriasComponent;
  let fixture: ComponentFixture<MateriasComponent>;

  beforeEach(() => {
    const userServiceStub = () => ({
      getAllInfosById: () => ({ subscribe: f => f({}) })
    });
    const materiaServiceStub = () => ({
      create: (nome, descricao) => ({ subscribe: f => f({}) }),
      update: (idMateria, nomeMateria, descricao) => ({
        subscribe: f => f({})
      }),
      delete: idMateria => ({ subscribe: f => f({}) }),
      getAll: () => ({ subscribe: f => f({}) })
    });
    const notaMateriaServiceStub = () => ({
      create: (idMateria, nota, tipoNota, arg3) => ({ subscribe: f => f({}) }),
      update: (idNotaMateria, idMateria, notaMateria, tipoNota, arg4) => ({
        subscribe: f => f({})
      }),
      delete: idNotaMateria => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MateriasComponent],
      providers: [
        { provide: UserService, useFactory: userServiceStub },
        { provide: MateriaService, useFactory: materiaServiceStub },
        { provide: NotaMateriaService, useFactory: notaMateriaServiceStub }
      ]
    });
    spyOn(MateriasComponent.prototype, 'refresh');
    fixture = TestBed.createComponent(MateriasComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`notasXmaterias has default value`, () => {
    expect(component.notasXmaterias).toEqual([]);
  });

  it(`displayedColumns has default value`, () => {
    expect(component.displayedColumns).toEqual([`Nota`, `Tipo`, `Data`, ` `]);
  });

  it(`loaded has default value`, () => {
    expect(component.loaded).toEqual(false);
  });

  it(`materias has default value`, () => {
    expect(component.materias).toEqual([]);
  });

  it(`notas has default value`, () => {
    expect(component.notas).toEqual([]);
  });

  it(`tipos has default value`, () => {
    expect(component.tipos).toEqual([
      `Trabalho em Grupo`,
      `Trabalho Individual`,
      `Prova`,
      `Atividade`
    ]);
  });

  it(`notaValida has default value`, () => {
    expect(component.notaValida).toEqual(true);
  });

  it(`dataValida has default value`, () => {
    expect(component.dataValida).toEqual(true);
  });

  it(`camposValidos has default value`, () => {
    expect(component.camposValidos).toEqual(true);
  });

  it(`length has default value`, () => {
    expect(component.length).toEqual(undefined);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(MateriasComponent.prototype.refresh).toHaveBeenCalled();
    });
  });

  describe('saveMateria', () => {
    it('makes expected calls', () => {
      const materiaServiceStub: MateriaService = fixture.debugElement.injector.get(
        MateriaService
      );
      spyOn(component, 'alertSucess').and.callThrough();
      (<jasmine.Spy>component.refresh).calls.reset();
      spyOn(component, 'alertError').and.callThrough();
      spyOn(materiaServiceStub, 'create').and.callThrough();
      component.saveMateria();
      expect(component.alertSucess).toHaveBeenCalled();
      expect(component.refresh).toHaveBeenCalled();
      expect(component.alertError).toHaveBeenCalled();
      expect(materiaServiceStub.create).toHaveBeenCalled();
    });
  });

  describe('editMateria', () => {
    it('makes expected calls', () => {
      const materiaServiceStub: MateriaService = fixture.debugElement.injector.get(
        MateriaService
      );
      spyOn(component, 'alertSucess').and.callThrough();
      spyOn(component, 'alertError').and.callThrough();
      spyOn(materiaServiceStub, 'update').and.callThrough();
      component.editMateria();
      expect(component.alertSucess).toHaveBeenCalled();
      expect(component.alertError).toHaveBeenCalled();
      expect(materiaServiceStub.update).toHaveBeenCalled();
    });
  });

  describe('saveNota', () => {
    it('makes expected calls', () => {
      const notaMateriaServiceStub: NotaMateriaService = fixture.debugElement.injector.get(
        NotaMateriaService
      );
      spyOn(component, 'alertSucess').and.callThrough();
      (<jasmine.Spy>component.refresh).calls.reset();
      spyOn(component, 'alertError').and.callThrough();
      spyOn(notaMateriaServiceStub, 'create').and.callThrough();
      component.saveNota();
      expect(component.alertSucess).toHaveBeenCalled();
      expect(component.refresh).toHaveBeenCalled();
      expect(component.alertError).toHaveBeenCalled();
      expect(notaMateriaServiceStub.create).toHaveBeenCalled();
    });
  });

  describe('editNota', () => {
    it('makes expected calls', () => {
      const notaMateriaServiceStub: NotaMateriaService = fixture.debugElement.injector.get(
        NotaMateriaService
      );
      spyOn(component, 'alertSucess').and.callThrough();
      spyOn(component, 'setTable').and.callThrough();
      spyOn(component, 'alertError').and.callThrough();
      spyOn(notaMateriaServiceStub, 'update').and.callThrough();
      component.editNota();
      expect(component.alertSucess).toHaveBeenCalled();
      expect(component.setTable).toHaveBeenCalled();
      expect(component.alertError).toHaveBeenCalled();
      expect(notaMateriaServiceStub.update).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      const materiaServiceStub: MateriaService = fixture.debugElement.injector.get(
        MateriaService
      );
      spyOn(userServiceStub, 'getAllInfosById').and.callThrough();
      spyOn(materiaServiceStub, 'getAll').and.callThrough();
      (<jasmine.Spy>component.refresh).and.callThrough();
      component.refresh();
      expect(userServiceStub.getAllInfosById).toHaveBeenCalled();
      expect(materiaServiceStub.getAll).toHaveBeenCalled();
    });
  });
});
