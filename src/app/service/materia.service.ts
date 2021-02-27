import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MateriaService {
    public LOGIN_SERVICE_URL = `${environment.API_URL}`;
    public token = localStorage.getItem('token');
    public idUsuario = localStorage.getItem('idUsuario');
    
    httpOptions = {
        headers: new HttpHeaders({ 'Content-type': 'application/json',
                                   'Authorization': `Bearer ${this.token}` }),
        responseType: 'text' as 'json'
    }
    constructor(private http: HttpClient) { }

    create(materia: string, descricao: string): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'materia/cadastro', {
            idUsuario: this.idUsuario,
            materia,
            descricao
        }, this.httpOptions);
    }

    update(idMateria: number, materia: string, descricao: string): Observable<any> {
        return this.http.put(this.LOGIN_SERVICE_URL + 'materia', {
            idMateria,
            idUsuario: this.idUsuario,
            materia,
            descricao,
        }, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.LOGIN_SERVICE_URL + `materia/${id}`, this.httpOptions);
    }

    getAll(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + 'materia', this.httpOptions)
    };

}
