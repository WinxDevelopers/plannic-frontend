import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NotaService } from './nota.service';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

describe('NotaService', () => {
  let service: NotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [NotaService]
    });
    service = TestBed.inject(NotaService);
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
      const req = httpTestingController.expectOne(`${environment.API_URL}nota`);
      expect(req.request.method).toEqual('GET');
      req.flush;
      httpTestingController.verify();
    });
  });
});
