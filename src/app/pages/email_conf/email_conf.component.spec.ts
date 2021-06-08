import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Email_confComponent } from './email_conf.component';

describe('Email_confComponent', () => {
  let component: Email_confComponent;
  let fixture: ComponentFixture<Email_confComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [Email_confComponent]
    });
    fixture = TestBed.createComponent(Email_confComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
