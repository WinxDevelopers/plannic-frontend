import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MateriaService } from 'src/app/service/materia.service';
import { SugestoesComponent } from './sugestoes.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SugestoesComponent', () => {
  let component: SugestoesComponent;
  let fixture: ComponentFixture<SugestoesComponent>;

  beforeEach(() => {
    const materiaServiceStub = () => ({
      getAllSugestao: () => ({ subscribe: f => f({}) }),
      updateSugestao: sug => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SugestoesComponent, TranslateModule.forRoot()],
      providers: [{ provide: MateriaService, useFactory: materiaServiceStub }]
    });
    fixture = TestBed.createComponent(SugestoesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`sugestoes has default value`, () => {
    expect(component.sugestoes).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const materiaServiceStub: MateriaService = fixture.debugElement.injector.get(
        MateriaService
      );
      spyOn(materiaServiceStub, 'getAllSugestao').and.callThrough();
      component.ngOnInit();
      expect(materiaServiceStub.getAllSugestao).toHaveBeenCalled();
    });
  });
});
