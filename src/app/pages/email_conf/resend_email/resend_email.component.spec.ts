import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Resend_emailComponent } from './resend_email.component';

describe('Resend_emailComponent', () => {
  let component: Resend_emailComponent;
  let fixture: ComponentFixture<Resend_emailComponent>;

  beforeEach(() => {
    const loginServiceStub = () => ({
      sendNewEmail: email => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [Resend_emailComponent],
      providers: [{ provide: LoginService, useFactory: loginServiceStub }]
    });
    fixture = TestBed.createComponent(Resend_emailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`progress has default value`, () => {
    expect(component.progress).toEqual(0);
  });
});
