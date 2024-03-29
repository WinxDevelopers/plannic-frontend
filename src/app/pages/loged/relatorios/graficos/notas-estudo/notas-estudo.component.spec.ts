import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';
import { NotasEstudoComponent } from './notas-estudo.component';
import { TranslateModule } from '@ngx-translate/core';

describe('NotasEstudoComponent', () => {
  let component: NotasEstudoComponent;
  let fixture: ComponentFixture<NotasEstudoComponent>;
  let estudos = JSON.stringify([{nota: 10, tipoEstudo: 'teste'}]);

  beforeEach(() => {
    const graficosServiceStub = () => ({
      notaEstudo: () => ({ subscribe: f => estudos })
    });
    TestBed.configureTestingModule({
      imports:[TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NotasEstudoComponent],
      providers: [{ provide: GraficosService, useFactory: graficosServiceStub }]
    });
    spyOn(NotasEstudoComponent.prototype, 'getNotas');
    fixture = TestBed.createComponent(NotasEstudoComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`chartType has default value`, () => {
    expect(component.chartType).toEqual(`bar`);
  });

  it(`loaded has default value`, () => {
    expect(component.loaded).toEqual(true);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(NotasEstudoComponent.prototype.getNotas).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      (<jasmine.Spy>component.getNotas).calls.reset();
      component.ngOnInit();
      expect(component.getNotas).toHaveBeenCalled();
    });
  });

  describe('getNotas', () => {
    it('makes expected calls', () => {
      const graficosServiceStub: GraficosService = fixture.debugElement.injector.get(
        GraficosService
      );
      spyOn(graficosServiceStub, 'notaEstudo').and.callThrough();
      (<jasmine.Spy>component.getNotas).and.callThrough();
      component.getNotas();
      expect(graficosServiceStub.notaEstudo).toHaveBeenCalled();
    });
  });
});
