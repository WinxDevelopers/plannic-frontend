import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';
import { NotasMateriaComponent } from './notas-materia.component';
import { TranslateModule } from '@ngx-translate/core';

describe('NotasMateriaComponent', () => {
  let component: NotasMateriaComponent;
  let fixture: ComponentFixture<NotasMateriaComponent>;

  beforeEach(() => {
    const graficosServiceStub = () => ({
      notaMateria: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports:[TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NotasMateriaComponent],
      providers: [{ provide: GraficosService, useFactory: graficosServiceStub }]
    });
    spyOn(NotasMateriaComponent.prototype, 'getNotas');
    fixture = TestBed.createComponent(NotasMateriaComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`chartType has default value`, () => {
    expect(component.chartType).toEqual(`horizontalBar`);
  });

  it(`chartColors has default value`, () => {
    expect(component.chartColors).toEqual([]);
  });

  it(`loaded has default value`, () => {
    expect(component.loaded).toEqual(true);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(NotasMateriaComponent.prototype.getNotas).toHaveBeenCalled();
    });
  });

  describe('getNotas', () => {
    it('makes expected calls', () => {
      const graficosServiceStub: GraficosService = fixture.debugElement.injector.get(
        GraficosService
      );
      spyOn(graficosServiceStub, 'notaMateria').and.callThrough();
      (<jasmine.Spy>component.getNotas).and.callThrough();
      component.getNotas();
      expect(graficosServiceStub.notaMateria).toHaveBeenCalled();
    });
  });
});
