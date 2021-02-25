/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HorasEstudoComponent } from './horas-estudo.component';

describe('BarrasComponent', () => {
  let component: HorasEstudoComponent;
  let fixture: ComponentFixture<HorasEstudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasEstudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasEstudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
