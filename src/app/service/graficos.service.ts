import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GraficosService {
    public LOGIN_SERVICE_URL = `${environment.API_URL}`;
    public token = localStorage.getItem('token')
    
    httpOptions = {
        headers: new HttpHeaders({ 'Content-type': 'application/json',
                                   'Authorization': `Bearer ${this.token}` }),
        responseType: 'text' as 'json'
    }
    constructor(private http: HttpClient) { }

    notaEvolucao(idUsuario: number, idMateria: number): Observable<any> {
        return this.http
        .get(`${this.LOGIN_SERVICE_URL}/notasMateria/${idUsuario}/${idMateria}`, 
            {responseType: 'text'})
      }

    notaTipo(idUsuario: number): Observable<any> {
        return this.http
        .get(`${this.LOGIN_SERVICE_URL}/notavstipo/${idUsuario}`, 
            {responseType: 'text'})
      }

    notaMaior(idUsuario: number): Observable<any> {
        return this.http
        .get(`${this.LOGIN_SERVICE_URL}/notasMateria/notamaior/${idUsuario}`, 
            {responseType: 'text'})
    }

    notaMenor(idUsuario: number): Observable<any> {
        return this.http
        .get(`${this.LOGIN_SERVICE_URL}/notasMateria/notamenor/${idUsuario}`, 
            {responseType: 'text'})
    }
}