/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Resend_emailComponent } from './resend_email.component';

describe('Resend_emailComponent', () => {
  let component: Resend_emailComponent;
  let fixture: ComponentFixture<Resend_emailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resend_emailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resend_emailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
