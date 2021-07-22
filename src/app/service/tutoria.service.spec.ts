import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TutoriaService } from './tutoria.service';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

describe('TutoriaService', () => {
  let service: TutoriaService;
  let idUsuario = '1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [TutoriaService]
    });
    service = TestBed.inject(TutoriaService);
    service.idUsuario = idUsuario;
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
      const url = `${environment.API_URL}tutoria/alunos/${idUsuario}`;
      const req = httpTestingController.expectOne(url);
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
      const url = `${environment.API_URL}tutoria/tutores/${idUsuario}`;
      const req = httpTestingController.expectOne(url);
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
      const url = `${environment.API_URL}tutoria/cadastro/aluno/${idUsuario}`;
      const req = httpTestingController.expectOne(url);
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
      const url = `${environment.API_URL}tutoria/cadastro/tutor/${idUsuario}`;
      const req = httpTestingController.expectOne(url);
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
      const url = `${environment.API_URL}tutoria/aluno/${idUsuario}`;
      const req = httpTestingController.expectOne(url);
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
      const url = `${environment.API_URL}tutoria/tutor/${idUsuario}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });
});
