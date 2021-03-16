import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.API_URL}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public idUsuario = localStorage.getItem('idUsuario')
  public token = localStorage.getItem('token')

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
    responseType: 'text' as 'json'
  }

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllById() {
    let id = this.idUsuario;
    return this.http.get(API_URL + `usuario/${id}`, this.httpOptions)
  };
  
  deleteUser(){
    let id = this.idUsuario;
    return this.http.delete(API_URL + `usuario/${id}`, this.httpOptions)
  }
}