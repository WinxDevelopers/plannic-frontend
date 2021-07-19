import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
