import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public LOGIN_SERVICE_URL = `${environment.API_URL}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    let token;
    return this.http
    .get(`https://plannic-back.herokuapp.com/authenticate/${email}/${password}`, {responseType: 'text'})
    .toPromise()
  }

  register(email: string, password: string, nome: string): Observable<any> {
    return this.http.post(this.LOGIN_SERVICE_URL + 'usuario/cadastro', {
      email,
      password,
      nome
    }, this.httpOptions);
  }


}
