import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AgendamentoService } from './../../../service/agendamento.service';
import { UserService } from './../../../service/user.service';
import { MateriaService } from './../../../service/materia.service';
import { NotaMateriaService } from 'src/app/service/notaMateria.service';
import { FormsModule } from '@angular/forms';
import { MateriasComponent } from './materias.component';
import { TranslateModule } from '@ngx-translate/core';

describe('MateriasComponent', () => {
  let component: MateriasComponent;
  let fixture: ComponentFixture<MateriasComponent>;

  beforeEach(() => {
    const agendamentoServiceStub = () => ({
      getAll: () => ({ subscribe: f => f({}) }),
      delete: idAgendamento => ({})
    });
    const userServiceStub = () => ({
      getAllInfosById: () => ({ subscribe: f => f({}) })
    });
    const materiaServiceStub = () => ({
      createSugestao: sugestao => ({ subscribe: f => f({}) }),
      create: (idMateriaBase, nome, nome1) => ({ subscribe: f => f({}) }),
      update: (idMateria, idMateriaBase, nomeMateria, nomeMateria1) => ({
        subscribe: f => f({})
      }),
      delete: idMateria => ({ subscribe: f => f({}) }),
      newMaterial: (idMat, material, name, type, publico) => ({
        subscribe: f => f({})
      }),
      updateMaterial: (
        idMaterial,
        idMateria,
        material2,
        nomeMaterial,
        tipoMaterial,
        arg
      ) => ({ subscribe: f => f({}) }),
      deleteMaterial: idMaterial => ({ subscribe: f => f({}) }),
      getAllMaterialPublico: idMateriaBase => ({ subscribe: f => f({}) }),
      getAllMaterial: () => ({ subscribe: f => f({}) }),
      getAllBase: () => ({ subscribe: f => f({}) })
    });
    const notaMateriaServiceStub = () => ({
      create: (idMateria, nota, tipoNota, arg3) => ({ subscribe: f => f({}) }),
      update: (idNotaMateria, idMateria, notaMateria, tipoNota, arg4) => ({
        subscribe: f => f({})
      }),
      delete: idNotaMateria => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MateriasComponent],
      providers: [
        { provide: AgendamentoService, useFactory: agendamentoServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: MateriaService, useFactory: materiaServiceStub },
        { provide: NotaMateriaService, useFactory: notaMateriaServiceStub }
      ]
    });
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
    expect(component.displayedColumns).toEqual([`nota`, `tipo`, `data`, ` `]);
  });

  it(`loaded has default value`, () => {
    expect(component.loaded).toEqual(false);
  });

  it(`materias has default value`, () => {
    expect(component.materias).toEqual([]);
  });

  it(`materiais has default value`, () => {
    expect(component.materiais).toEqual([]);
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

  it(`arquivos has default value`, () => {
    expect(component.arquivos).toEqual([]);
  });

  it(`displayedColumnsMateriais has default value`, () => {
    expect(component.displayedColumnsMateriais).toEqual([`nome`, ` `]);
  });

  it(`materiaisPublicos has default value`, () => {
    expect(component.materiaisPublicos).toEqual([]);
  });

  it(`searchinPublicos has default value`, () => {
    expect(component.searchinPublicos).toEqual(false);
  });

  it(`userMaterias has default value`, () => {
    expect(component.userMaterias).toEqual([]);
  });

  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'refresh').and.callThrough();
      component.ngAfterViewInit();
      expect(component.refresh).toHaveBeenCalled();
    });
  });

  describe('saveMateria', () => {
    it('makes expected calls', () => {
      const materiaServiceStub: MateriaService = fixture.debugElement.injector.get(
        MateriaService
      );
      spyOn(component, 'alertSucess').and.callThrough();
      spyOn(component, 'refresh').and.callThrough();
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
      spyOn(component, 'refresh').and.callThrough();
      spyOn(component, 'alertError').and.callThrough();
      spyOn(materiaServiceStub, 'update').and.callThrough();
      component.editMateria();
      expect(component.alertSucess).toHaveBeenCalled();
      expect(component.refresh).toHaveBeenCalled();
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
      spyOn(component, 'refresh').and.callThrough();
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
      spyOn(component, 'refresh').and.callThrough();
      spyOn(component, 'alertError').and.callThrough();
      spyOn(notaMateriaServiceStub, 'update').and.callThrough();
      component.editNota();
      expect(component.alertSucess).toHaveBeenCalled();
      expect(component.refresh).toHaveBeenCalled();
      expect(component.alertError).toHaveBeenCalled();
      expect(notaMateriaServiceStub.update).toHaveBeenCalled();
    });
  });

  describe('uploadFiles', () => {
    it('makes expected calls', () => {
      const materiaServiceStub: MateriaService = fixture.debugElement.injector.get(
        MateriaService
      );
      spyOn(component, 'readFile').and.callThrough();
      spyOn(component, 'alertSucess').and.callThrough();
      spyOn(component, 'refresh').and.callThrough();
      spyOn(component, 'alertError').and.callThrough();
      spyOn(materiaServiceStub, 'newMaterial').and.callThrough();
      component.uploadFiles();
      expect(component.readFile).toHaveBeenCalled();
      expect(component.alertSucess).toHaveBeenCalled();
      expect(component.refresh).toHaveBeenCalled();
      expect(component.alertError).toHaveBeenCalled();
      expect(materiaServiceStub.newMaterial).toHaveBeenCalled();
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
      spyOn(component, 'dateToString').and.callThrough();
      spyOn(userServiceStub, 'getAllInfosById').and.callThrough();
      spyOn(materiaServiceStub, 'getAllMaterial').and.callThrough();
      spyOn(materiaServiceStub, 'getAllBase').and.callThrough();
      component.refresh();
      expect(component.dateToString).toHaveBeenCalled();
      expect(userServiceStub.getAllInfosById).toHaveBeenCalled();
      expect(materiaServiceStub.getAllMaterial).toHaveBeenCalled();
      expect(materiaServiceStub.getAllBase).toHaveBeenCalled();
    });
  });
});
