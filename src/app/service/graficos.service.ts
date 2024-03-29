import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GraficosService {
    public REQUEST_URL = `${environment.API_URL}`;
    public token = localStorage.getItem('token')
    public idUsuario = localStorage.getItem('idUsuario');
    
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

    notaEvolucao(idMateria: number): Observable<any> {
        return this.http.get(this.REQUEST_URL + `notasMateria/notasvsdata/${this.idUsuario}/${idMateria}`, this.httpOptions)
    };

    notaTipo(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `notasMateria/notastipo/${this.idUsuario}`, this.httpOptions)
    };

    notaEstudo(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `notasMateria/notasvstipo/${this.idUsuario}`, this.httpOptions)
    };

    notaMateria(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `notasMateria/notasvsMateria/${this.idUsuario}`, this.httpOptions)
    };

    notaHora(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `notasMateria/horasvsnota/${this.idUsuario}`, this.httpOptions)
    };

    notaMaior(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `notasMateria/notamaior/${this.idUsuario}`, this.httpOptions)
    };

    notaMenor(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `notasMateria/notamenor/${this.idUsuario}`, this.httpOptions)
    };
}