/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Select_materiasComponent } from './select_materias.component';

describe('Select_materiasComponent', () => {
  let component: Select_materiasComponent;
  let fixture: ComponentFixture<Select_materiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Select_materiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Select_materiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
