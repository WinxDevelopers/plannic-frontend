import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let user = JSON.stringify({idfuncao: 1});
  beforeEach(() => {
    const userServiceStub = () => ({
      userType: () => ({ subscribe: f => user })
    });
    const translateServiceStub = () => ({});
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavbarComponent],
      providers: [
        { provide: UserService, useFactory: userServiceStub },
        { provide: TranslateService, useFactory: translateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isAdm has default value`, () => {
    expect(component.isAdm).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'userType').and.callThrough();
      component.ngOnInit();
      expect(userServiceStub.userType).toHaveBeenCalled();
    });
  });

  describe('deslogar', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.deslogar();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
