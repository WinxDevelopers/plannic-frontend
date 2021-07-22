import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';
import { HorasEstudoComponent } from './horas-estudo.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('HorasEstudoComponent', () => {
  let component: HorasEstudoComponent;
  let fixture: ComponentFixture<HorasEstudoComponent>;
  let notaMock = {nomeMateria: 'teste', minEstudo: 50};

  beforeEach(() => {
    const graficosServiceStub = () => ({
      notaHora: () => (of(
        JSON.stringify(notaMock)
      ))
    });
    TestBed.configureTestingModule({
      imports:[TranslateModule.forRoot()],
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
      
      (<jasmine.Spy>component.getNotas).and.callThrough();
      component.getNotas();
      expect(component.notas).toEqual(notaMock);
    });
  });
});
