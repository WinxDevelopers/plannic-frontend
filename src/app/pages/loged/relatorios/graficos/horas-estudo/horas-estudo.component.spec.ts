import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';
import { HorasEstudoComponent } from './horas-estudo.component';

describe('HorasEstudoComponent', () => {
  let component: HorasEstudoComponent;
  let fixture: ComponentFixture<HorasEstudoComponent>;

  beforeEach(() => {
    const graficosServiceStub = () => ({
      notaHora: idUsuario => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HorasEstudoComponent],
      providers: [{ provide: GraficosService, useFactory: graficosServiceStub }]
    });
    spyOn(HorasEstudoComponent.prototype, 'getNotas');
    fixture = TestBed.createComponent(HorasEstudoComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`chartType has default value`, () => {
    expect(component.chartType).toEqual(`pie`);
  });

  it(`chartColors has default value`, () => {
    expect(component.chartColors).toEqual([]);
  });

  it(`loaded has default value`, () => {
    expect(component.loaded).toEqual(true);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(HorasEstudoComponent.prototype.getNotas).toHaveBeenCalled();
    });
  });

  describe('getNotas', () => {
    it('makes expected calls', () => {
      const graficosServiceStub: GraficosService = fixture.debugElement.injector.get(
        GraficosService
      );
      spyOn(graficosServiceStub, 'notaHora').and.callThrough();
      (<jasmine.Spy>component.getNotas).and.callThrough();
      component.getNotas();
      expect(graficosServiceStub.notaHora).toHaveBeenCalled();
    });
  });
});
