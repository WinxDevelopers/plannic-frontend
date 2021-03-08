import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotaMateriaService {
    public LOGIN_SERVICE_URL = `${environment.API_URL}`;
    public token = localStorage.getItem('token')
    public IdUsuario = localStorage.getItem('idUsuario')

    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        }),
        responseType: 'text' as 'json'
    }
    constructor(private http: HttpClient) { }

    create(idMateria: number, notaMateria: number, tipoNota: string, dataNota: string): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'notasMateria/cadastro', {
            idUsuario: this.IdUsuario,
            idMateria,
            notaMateria,
            tipoNota,
            dataNota
        }, this.httpOptions);
    }

    update(id: number, idMateria: number ,notaMateria: number, tipoNota: string, dataNota: string): Observable<any> {
        return this.http.put(this.LOGIN_SERVICE_URL + 'notasMateria', {
            idUsuario: this.IdUsuario,
            idMateria,
            id,
            notaMateria,
            tipoNota,
            dataNota
        }, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.LOGIN_SERVICE_URL + `notasMateria/${id}`, this.httpOptions);
    }

    getAll(): Observable<any> {
        let id = this.IdUsuario;
        return this.http.get(this.LOGIN_SERVICE_URL + `notasMateria/${id}`, this.httpOptions)
    };

}
