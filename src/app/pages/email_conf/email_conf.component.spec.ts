/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Email_confComponent } from './email_conf.component';

describe('Email_confComponent', () => {
  let component: Email_confComponent;
  let fixture: ComponentFixture<Email_confComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Email_confComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Email_confComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
