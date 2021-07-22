import { TestBed } from '@angular/core/testing';
import {  HttpClientTestingModule,  HttpTestingController} from '@angular/common/http/testing';
import { AgendamentoService } from './agendamento.service';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

describe('AgendamentoService', () => {
  let service: AgendamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [AgendamentoService]
    });
    service = TestBed.inject(AgendamentoService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAll().subscribe(res => {
        expect(res).toEqual;
      });

      const url = `${environment.API_URL}agendamento`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });
});
