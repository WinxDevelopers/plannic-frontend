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

    create(nomeMateria: string, descricao: string): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'materia/cadastro', {
            idUsuario: this.idUsuario,
            nomeMateria,
            descricao
        }, this.httpOptions);
    }

    update(idMateria: number, nomeMateria: string, descricao: string): Observable<any> {
        return this.http.put(this.LOGIN_SERVICE_URL + 'materia', {
            idMateria,
            idUsuario: this.idUsuario,
            nomeMateria,
            descricao,
        }, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.LOGIN_SERVICE_URL + `materia/${id}`, this.httpOptions);
    }

    getAll(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + 'materia', this.httpOptions)
    };

    // Buscar Matérias Base
    createBase(materiaBase: string): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'materia/cadastro/base', {
            idUsuario: this.idUsuario,
            materiaBase
        }, this.httpOptions);
    }

    getAllBase(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + 'materia/base', this.httpOptions)
    };

    // Sugestão de Matérias
    createSugestão(nomeMateria: string): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'materia/cadastro/sugestoes', {
            idUsuario: this.idUsuario,
            nomeMateria
        }, this.httpOptions);
    }

    updateSugestao(idSugestoesMateria: number, nomeMateria: string, votos: number, totalVotos: number): Observable<any> {
        return this.http.put(this.LOGIN_SERVICE_URL + 'materia/sugestoes', {
            idSugestoesMateria,
            idUsuario: this.idUsuario,
            nomeMateria,
            votos,
            totalVotos
        }, this.httpOptions);
    }

    getAllSugestao(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + 'materia/sugestoes', this.httpOptions)
    };
}
