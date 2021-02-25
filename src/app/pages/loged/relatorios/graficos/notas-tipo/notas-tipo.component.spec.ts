/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotasTipoComponent } from './notas-tipo.component';

describe('BarrasComponent', () => {
  let component: NotasTipoComponent;
  let fixture: ComponentFixture<NotasTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
