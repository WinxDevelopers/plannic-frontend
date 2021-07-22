import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { UserService } from 'src/app/service/user.service';
import { MateriaService } from 'src/app/service/materia.service';
import { NotaMateriaService } from 'src/app/service/notaMateria.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigComponent } from './config.component';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;
  let userService: UserService;

  let userInfos = [{ email: 'teste@teste.com', nome: 'teste da silva' }];
  let telegramIni = { idTelegram: 'teste' };
  let result = {
    result: [{
      message: {
        chat: {
          id: 10
        }
      }
    }]
  };

  beforeEach(() => {
    const agendamentoServiceStub = () => ({
      delete: idAgendamento => ({ toPromise: () => ({}) })
    });
    const userServiceStub = () => ({
      telegramObj: () => (of(result)),
      addTelegramID: (chatId, username) => ({ subscribe: f => f({}) }),
      getAllInfosById: () => (of(
        JSON.stringify(userInfos)
      )),
      getTelegramID: () => (of(
        JSON.stringify(telegramIni)
      )),
      changePass: senha => (of()),
      edit: (nome, email, arg2) => (of({})),
      delete: () => (of())
    });
    const materiaServiceStub = () => ({
      delete: idMateria => ({ toPromise: () => ({}) })
    });
    const notaMateriaServiceStub = () => ({
      delete: idNotaMateria => ({ toPromise: () => ({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfigComponent],
      providers: [
        { provide: AgendamentoService, useFactory: agendamentoServiceStub },
        { provide: UserService, useFactory: userServiceStub },
        { provide: MateriaService, useFactory: materiaServiceStub },
        { provide: NotaMateriaService, useFactory: notaMateriaServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`passMinOk has default value`, () => {
    expect(component.passMinOk).toEqual(true);
  });

  it('makes expected calls - verifyTelegramObg', () => {
    const spy = spyOn(userService, 'addTelegramID');
    component.verifyTelegramObg();
    expect(spy).toHaveBeenCalled();
  });

  it('makes expected calls -alterarInfos', () => {
    const spy = spyOn(component, 'alertSucess');
    component.alterarInfos();

    expect(spy).toHaveBeenCalled();
  });
});
