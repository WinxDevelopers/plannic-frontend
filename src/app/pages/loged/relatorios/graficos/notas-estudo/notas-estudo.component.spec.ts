/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotasEstudoComponent } from './notas-estudo.component';

describe('BarrasComponent', () => {
  let component: NotasEstudoComponent;
  let fixture: ComponentFixture<NotasEstudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasEstudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasEstudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
