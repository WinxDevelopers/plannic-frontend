import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { GraficosService } from './graficos.service';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

describe('GraficosService', () => {
  let service: GraficosService;
  let idUsuario = '1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [GraficosService]
    });
    service = TestBed.inject(GraficosService);
    service.idUsuario = idUsuario;
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('notaTipo', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.notaTipo().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}notasMateria/notastipo/${idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('notaEstudo', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.notaEstudo().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}notasMateria/notasvstipo/${idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('notaMateria', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.notaMateria().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}notasMateria/notasvsMateria/${idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('notaHora', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.notaHora().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}notasMateria/horasvsnota/${idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('notaMaior', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.notaMaior().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}notasMateria/notamaior/${idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('notaMenor', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.notaMenor().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}notasMateria/notamenor/${idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });
});
