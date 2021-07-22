import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NotaMateriaService } from './notaMateria.service';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

describe('NotaMateriaService', () => {
  let service: NotaMateriaService;
  let id = '1';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [NotaMateriaService]
    });
    service = TestBed.inject(NotaMateriaService);
    service.IdUsuario = id;
    
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
      const url = `${environment.API_URL}notasMateria/1`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });
});
