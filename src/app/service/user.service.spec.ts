import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    service.idUsuario = '1';
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getPublicContent', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getPublicContent().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}all`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getUserBoard', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getUserBoard().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}user`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getModeratorBoard', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getModeratorBoard().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}mod`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getAdminBoard', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAdminBoard().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}admin`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getAllInfosById', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAllInfosById().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}usuario/${service.idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('delete', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.delete().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}usuario/${service.idUsuario}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('userType', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.userType().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}usuario/funcao/${service.idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('telegramObj', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.telegramObj().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne("https://api.telegram.org/bot1837445567:AAEcp__9KjdGBCXlZijPu34JqWgJazjm-Wo/getUpdates");
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getTelegramID', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getTelegramID().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}usuariotelegram/${service.idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getAvaliacoes', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAvaliacoesPendentes().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}notasusuario/${service.idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getNota', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getNota().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}notasusuario/nota/${service.idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });
});
