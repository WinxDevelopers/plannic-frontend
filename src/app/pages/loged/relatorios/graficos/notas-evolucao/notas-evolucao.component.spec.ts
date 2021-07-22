import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';
import { UserService } from 'src/app/service/user.service';
import { FormsModule } from '@angular/forms';
import { NotasEvolucaoComponent } from './notas-evolucao.component';
import { TranslateModule } from '@ngx-translate/core';

describe('NotasEvolucaoComponent', () => {
  let component: NotasEvolucaoComponent;
  let fixture: ComponentFixture<NotasEvolucaoComponent>;
  let notas = JSON.stringify([{notaMateria: 10, dataNota : '10-07-2021'}]);
  let materias = JSON.stringify([{idMateria: 10, nomeMateria : 'teste'}]);

  beforeEach(() => {
    const graficosServiceStub = () => ({
      notaEvolucao: idMateria => ({ subscribe: f => notas })
    });
    const userServiceStub = () => ({
      getAllInfosById: () => ({ subscribe: f => materias })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, TranslateModule.forRoot()],
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
    expect(component.chartColors.length).toBeGreaterThan(0);
  });

  it(`loaded has default value`, () => {
    expect(component.loaded).toEqual(true);
  });

  describe('refresh', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(component, 'getNotas').and.callThrough();
      spyOn(userServiceStub, 'getAllInfosById').and.callThrough();
      component.refresh();
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
      expect(graficosServiceStub.notaEvolucao).toHaveBeenCalled();
    });
  });
});
