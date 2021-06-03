import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public LOGIN_SERVICE_URL = `${environment.API_URL}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json',
                               'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
                               'Content-Security-Policy': 'Content-Security-Policy: default-src https://plannic-backend.herokuapp.com; default-src http://localhost:8080',
                               'X-Frame-Options': 'SAMEORIGIN',
                               'X-Content-Type-Options': 'nosniff always',
                               'Referrer-Policy': 'no-referrer',
                               'Permissions-Policy': 'geolocation=(self "https://plannic-backend.herokuapp.com" "http://localhost:8080")' }),
    responseType: 'text' as 'json'
}
  constructor(private http: HttpClient) { }

 
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.LOGIN_SERVICE_URL + 'authenticate', {
      email,
      password
    }, this.httpOptions);
  }

  register(email: string, password: string, nome: string): Observable<any> {
    return this.http.post(this.LOGIN_SERVICE_URL + 'usuario/cadastro', {
      email,
      password,
      nome
    }, this.httpOptions);
  }

  sendNewEmail(email: string){
    return this.http.post(this.LOGIN_SERVICE_URL + 'usuario/atualizaverificaemail', {
      email
    }, this.httpOptions);
  }
}
