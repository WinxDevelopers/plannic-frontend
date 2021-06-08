import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';
import { UserService } from 'src/app/service/user.service';
import { FormsModule } from '@angular/forms';
import { NotasEvolucaoComponent } from './notas-evolucao.component';

describe('NotasEvolucaoComponent', () => {
  let component: NotasEvolucaoComponent;
  let fixture: ComponentFixture<NotasEvolucaoComponent>;

  beforeEach(() => {
    const graficosServiceStub = () => ({
      notaEvolucao: (idUsuario, idMateria) => ({ subscribe: f => f({}) })
    });
    const userServiceStub = () => ({
      getAllInfosById: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NotasEvolucaoComponent],
      providers: [
        { provide: GraficosService, useFactory: graficosServiceStub },
        { provide: UserService, useFactory: userServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NotasEvolucaoComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`materias has default value`, () => {
    expect(component.materias).toEqual([]);
  });

  it(`chartType has default value`, () => {
    expect(component.chartType).toEqual(`line`);
  });

  it(`chartColors has default value`, () => {
    expect(component.chartColors).toEqual([]);
  });

  it(`loaded has default value`, () => {
    expect(component.loaded).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'refresh').and.callThrough();
      component.ngOnInit();
      expect(component.refresh).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(component, 'getNotas').and.callThrough();
      spyOn(userServiceStub, 'getAllInfosById').and.callThrough();
      component.refresh();
      expect(component.getNotas).toHaveBeenCalled();
      expect(userServiceStub.getAllInfosById).toHaveBeenCalled();
    });
  });

  describe('getNotas', () => {
    it('makes expected calls', () => {
      const graficosServiceStub: GraficosService = fixture.debugElement.injector.get(
        GraficosService
      );
      spyOn(component, 'dateToString').and.callThrough();
      spyOn(graficosServiceStub, 'notaEvolucao').and.callThrough();
      component.getNotas();
      expect(component.dateToString).toHaveBeenCalled();
      expect(graficosServiceStub.notaEvolucao).toHaveBeenCalled();
    });
  });
});
