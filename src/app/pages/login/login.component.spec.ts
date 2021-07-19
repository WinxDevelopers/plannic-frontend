import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const loginServiceStub = () => ({
      login: (email, password) => ({ subscribe: f => f({}) })
    });
    const activatedRouteStub = () => ({
      queryParams: { subscribe: f => f({}) }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useFactory: loginServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`roles has default value`, () => {
    expect(component.roles).toEqual([]);
  });

  it(`valEmail has default value`, () => {
    expect(component.valEmail).toEqual(true);
  });

  it(`valCampos has default value`, () => {
    expect(component.valCampos).toEqual(true);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.ngOnInit();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const loginServiceStub: LoginService = fixture.debugElement.injector.get(
        LoginService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(loginServiceStub, 'login').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.onSubmit();
      expect(loginServiceStub.login).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
