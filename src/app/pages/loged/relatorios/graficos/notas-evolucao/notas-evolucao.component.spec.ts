/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotasEvolucaoComponent } from './notas-evolucao.component';

describe('BarrasComponent', () => {
  let component: NotasEvolucaoComponent;
  let fixture: ComponentFixture<NotasEvolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasEvolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasEvolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
