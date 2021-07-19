import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TutoriaService } from './tutoria.service';
import { TranslateModule } from '@ngx-translate/core';

describe('TutoriaService', () => {
  let service: TutoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [TutoriaService]
    });
    service = TestBed.inject(TutoriaService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getSemTutorById', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getSemTutorById().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getSemAlunoById', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getSemAlunoById().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getAllUserAluno', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAllUserAluno().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getAllUserTutor', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAllUserTutor().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getAllAlunosProcurandoTutor', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAllAlunosProcurandoTutor().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getTutoresProcurandoAluno', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getTutoresProcurandoAluno().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });
});
