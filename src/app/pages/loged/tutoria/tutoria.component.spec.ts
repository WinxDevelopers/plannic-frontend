import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TutoriaComponent } from './tutoria.component';

describe('TutoriaComponent', () => {
  let component: TutoriaComponent;
  let fixture: ComponentFixture<TutoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TutoriaComponent]
    });
    fixture = TestBed.createComponent(TutoriaComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
