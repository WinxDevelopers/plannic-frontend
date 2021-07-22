import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';
import { NotasTipoComponent } from './notas-tipo.component';
import { TranslateModule } from '@ngx-translate/core';
import { ArrayType } from '@angular/compiler';

describe('NotasTipoComponent', () => {
  let component: NotasTipoComponent;
  let fixture: ComponentFixture<NotasTipoComponent>;
  let nota = JSON.stringify([{ nota: 10, tipo_nota: 'teste' }]);

  beforeEach(() => {
    const graficosServiceStub = () => ({
      notaTipo: () => ({
        subscribe: f => f((nota))
      })
    });
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NotasTipoComponent],
      providers: [{ provide: GraficosService, useFactory: graficosServiceStub }]
    });
    spyOn(NotasTipoComponent.prototype, 'getNotas');
    fixture = TestBed.createComponent(NotasTipoComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`chartType has default value`, () => {
    expect(component.chartType).toEqual(`bar`);
  });

  it(`chartColors has default value`, () => {
    expect(component.chartColors).not.toEqual([]);
  });

  it(`loaded has default value`, () => {
    expect(component.loaded).toEqual(true);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(NotasTipoComponent.prototype.getNotas).toHaveBeenCalled();
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
      spyOn(graficosServiceStub, 'notaTipo').and.callThrough();
      (<jasmine.Spy>component.getNotas).and.callThrough();
      component.getNotas();
      expect(graficosServiceStub.notaTipo).toHaveBeenCalled();
    });
  });
});
