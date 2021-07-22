import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TutoriaComponent } from './tutoria.component';
import { TranslateModule } from '@ngx-translate/core';
import { TutoriaService } from 'src/app/service/tutoria.service';
import { UserService } from 'src/app/service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TutoriaComponent', () => {
  let component: TutoriaComponent;
  let fixture: ComponentFixture<TutoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TutoriaComponent],
      providers: [
        TutoriaService,
        UserService
      ]
    });
    fixture = TestBed.createComponent(TutoriaComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
