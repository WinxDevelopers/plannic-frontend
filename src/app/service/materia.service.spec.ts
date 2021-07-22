import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MateriaService } from './materia.service';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

describe('MateriaService', () => {
  let service: MateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [MateriaService]
    });
    service = TestBed.inject(MateriaService);
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
      const req = httpTestingController.expectOne(`${environment.API_URL}materia`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getAllBase', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAllBase().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}materia/base`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getAllMaterial', () => {
    it('makes expected calls', () => {
      service.idUsuario = '1';
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAllMaterial().subscribe(res => {
        expect(res).toEqual;
      });
      const req = httpTestingController.expectOne(`${environment.API_URL}material/${service.idUsuario}`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });

  describe('getAllSugestao', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);

      service.getAllSugestao()
        .subscribe(res => {
          expect(res).toEqual;
        });

      const req = httpTestingController.expectOne(
        `${environment.API_URL}materia/sugestoes`
      );

      expect(req.request.method).toEqual('GET');
      req.flush(jasmine.any(Array));
    });
  });
});
