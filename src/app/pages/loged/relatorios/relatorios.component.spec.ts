import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RelatoriosComponent } from './relatorios.component';
import { TranslateModule } from '@ngx-translate/core';

describe('RelatoriosComponent', () => {
  let component: RelatoriosComponent;
  let fixture: ComponentFixture<RelatoriosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RelatoriosComponent]
    });
    fixture = TestBed.createComponent(RelatoriosComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
