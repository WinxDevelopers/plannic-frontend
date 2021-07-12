import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotaMateriaService {
    public REQUEST_URL = `${environment.API_URL}`;
    public token = localStorage.getItem('token')
    public IdUsuario = localStorage.getItem('idUsuario')

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

    create(idMateria: number, notaMateria: number, tipoNota: string, dataNota: string): Observable<any> {
        return this.http.post(this.REQUEST_URL + 'notasMateria/cadastro', {
            idUsuario: this.IdUsuario,
            idMateria,
            notaMateria,
            tipoNota,
            dataNota
        }, this.httpOptions);
    }

    update(idNotaMateria: number, idMateria: number ,notaMateria: number, tipoNota: string, dataNota: string): Observable<any> {
        return this.http.put(this.REQUEST_URL + 'notasMateria', {
            idUsuario: this.IdUsuario,
            idMateria,
            idNotaMateria,
            notaMateria,
            tipoNota,
            dataNota
        }, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.REQUEST_URL + `notasMateria/${id}`, this.httpOptions);
    }

    getAll(): Observable<any> {
        let id = this.IdUsuario;
        return this.http.get(this.REQUEST_URL + `notasMateria/${id}`, this.httpOptions)
    };

}
