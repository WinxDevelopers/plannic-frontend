import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';
import { BadgesComponent } from './badges.component';

describe('BadgesComponent', () => {
  let component: BadgesComponent;
  let fixture: ComponentFixture<BadgesComponent>;

  beforeEach(() => {
    const graficosServiceStub = () => ({
      notaMenor: idUsuario => ({ subscribe: f => f({}) }),
      notaMaior: idUsuario => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BadgesComponent],
      providers: [{ provide: GraficosService, useFactory: graficosServiceStub }]
    });
    fixture = TestBed.createComponent(BadgesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`buscaTutor has default value`, () => {
    expect(component.buscaTutor).toEqual(false);
  });

  it(`sejaTutor has default value`, () => {
    expect(component.sejaTutor).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'menorNota').and.callThrough();
      spyOn(component, 'maiorNota').and.callThrough();
      component.ngOnInit();
      expect(component.menorNota).toHaveBeenCalled();
      expect(component.maiorNota).toHaveBeenCalled();
    });
  });

  describe('menorNota', () => {
    it('makes expected calls', () => {
      const graficosServiceStub: GraficosService = fixture.debugElement.injector.get(
        GraficosService
      );
      spyOn(graficosServiceStub, 'notaMenor').and.callThrough();
      component.menorNota();
      expect(graficosServiceStub.notaMenor).toHaveBeenCalled();
    });
  });

  describe('maiorNota', () => {
    it('makes expected calls', () => {
      const graficosServiceStub: GraficosService = fixture.debugElement.injector.get(
        GraficosService
      );
      spyOn(graficosServiceStub, 'notaMaior').and.callThrough();
      component.maiorNota();
      expect(graficosServiceStub.notaMaior).toHaveBeenCalled();
    });
  });
});
