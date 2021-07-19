import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectLangComponent } from './select-lang.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SelectLangComponent', () => {
  let component: SelectLangComponent;
  let fixture: ComponentFixture<SelectLangComponent>;

  beforeEach(() => {
    const translateServiceStub = () => ({
      setDefaultLang: string => ({}),
      addLangs: array => ({}),
      use: arg => ({})
    });
    TestBed.configureTestingModule({
      imports:[ RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SelectLangComponent],
      providers: [
        { provide: TranslateService, useFactory: translateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SelectLangComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
