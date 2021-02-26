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

    httpOptions = {
        headers: new HttpHeaders({ 'Content-type': 'application/json',
                                   'Authorization': `Bearer ${this.token}` }),
        responseType: 'text' as 'json'
    }
    constructor(private http: HttpClient) { }

    create(notaMateria: number, tipoNota: number, dataNota: Date): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'notasMateria/cadastro', {
            'idUsuario':7,
            'idMateria':1,
            notaMateria,
            tipoNota, 
            dataNota
        }, this.httpOptions);
    }

    update(id: number, notaMateria: number, tipoNota: number, dataNota: Date): Observable<any> {
        return this.http.put(this.LOGIN_SERVICE_URL + 'notasMateria', {
            'idUsuario':7,
            'idMateria':1,
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
        return this.http.get(this.LOGIN_SERVICE_URL + 'notasMateria', this.httpOptions)
    };

}
