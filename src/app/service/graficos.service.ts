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
                                   'Authorization': `Bearer ${this.token}`,
                                   'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
                                   'Content-Security-Policy': 'Content-Security-Policy: default-src https://plannic-back.herokuapp.com; default-src http://localhost:8080',
                                   'X-Frame-Options': 'SAMEORIGIN',
                                   'X-Content-Type-Options': 'nosniff always',
                                   'Referrer-Policy': 'no-referrer',
                                   'Permissions-Policy': 'geolocation=(self "https://plannic-back.herokuapp.com" "http://localhost:8080")' }),
        responseType: 'text' as 'json'
    }
    constructor(private http: HttpClient) { }

    notaEvolucao(idUsuario: string, idMateria: number): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `notasMateria/notasvsdata/${idUsuario}/${idMateria}`, this.httpOptions)
    };

    notaTipo(idUsuario: string): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `notasMateria/notastipo/${idUsuario}`, this.httpOptions)
    };

    notaEstudo(idUsuario: string): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `notasMateria/notasvstipo/${idUsuario}`, this.httpOptions)
    };

    notaMateria(idUsuario: string): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `notasMateria/notasvsMateria/${idUsuario}`, this.httpOptions)
    };

    notaHora(idUsuario: string): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `notasMateria/horasvsnota/${idUsuario}`, this.httpOptions)
    };

    notaMaior(idUsuario: string): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `notasMateria/notamaior/${idUsuario}`, this.httpOptions)
    };

    notaMenor(idUsuario: string): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `notasMateria/notamenor/${idUsuario}`, this.httpOptions)
    };
}