import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrarComponent } from './registrar.component';

describe('RegistrarComponent', () => {
  let component: RegistrarComponent;
  let fixture: ComponentFixture<RegistrarComponent>;

  beforeEach(() => {
    const loginServiceStub = () => ({
      register: (email, password, nome) => ({ subscribe: f => f({}) })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const translateServiceStub = () => ({});
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RegistrarComponent],
      providers: [
        { provide: LoginService, useFactory: loginServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: TranslateService, useFactory: translateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(RegistrarComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isSuccessful has default value`, () => {
    expect(component.isSuccessful).toEqual(false);
  });

  it(`isSignUpFailed has default value`, () => {
    expect(component.isSignUpFailed).toEqual(false);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  it(`camposVal has default value`, () => {
    expect(component.camposVal).toEqual(true);
  });

  it(`emailVal has default value`, () => {
    expect(component.emailVal).toEqual(true);
  });

  it(`senhaMin has default value`, () => {
    expect(component.senhaMin).toEqual(true);
  });

  it(`senhaVal has default value`, () => {
    expect(component.senhaVal).toEqual(true);
  });

  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.ngAfterViewInit();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const loginServiceStub: LoginService = fixture.debugElement.injector.get(
        LoginService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(component, 'verify').and.callThrough();
      spyOn(loginServiceStub, 'register').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onSubmit();
      expect(component.verify).toHaveBeenCalled();
      expect(loginServiceStub.register).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
