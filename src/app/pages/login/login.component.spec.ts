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
  let router: Router;

  beforeEach(() => {
    const loginServiceStub = () => ({
      login: (email, password) => { subscribe: f => f() }
    });

    const activatedRouteStub = () => ({
      queryParams: { subscribe: f => f() }
    });

    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useFactory: loginServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
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
});
