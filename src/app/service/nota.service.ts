import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotaService {
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

    create(materia: string, descricao: string): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'nota/cadastro', {
            'idUsuario':7,
            materia,
            descricao
        }, this.httpOptions);
    }

    update(id: number, nome: string, descricao: string): Observable<any> {
        return this.http.put(this.LOGIN_SERVICE_URL + 'nota', {
            id,
            nome,
            descricao,
        }, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.LOGIN_SERVICE_URL + `nota/${id}`, this.httpOptions);
    }

    getAll(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + 'nota', this.httpOptions)
    };

}
