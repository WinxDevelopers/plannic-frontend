import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AgendamentoService {
    public LOGIN_SERVICE_URL = `${environment.API_URL}`;
    public token = localStorage.getItem('token')
    public idUsuario = localStorage.getItem('idUsuario')
    
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

    create(idMateria: number, recorrenciaInicio: string, recorrenciaFim: string, recorrencia: string, horaInicio: string, horaFim: string, tipoEstudo: string): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'agendamento/cadastro', {
            idUsuario: this.idUsuario,
            idMateria,
            recorrenciaInicio,
            recorrenciaFim,
            recorrencia,
            horaInicio,
            horaFim,
            tipoEstudo
        }, this.httpOptions);
    }

    update(idAgendamento: number, idMateria: number, recorrenciaInicio: string, recorrenciaFim: string, recorrencia: string, horaInicio: string, horaFim: string, tipoEstudo: string): Observable<any> {
        return this.http.put(this.LOGIN_SERVICE_URL + 'agendamento', {
            idUsuario: this.idUsuario,
            idAgendamento,
            idMateria,
            recorrenciaInicio,
            recorrenciaFim,
            recorrencia,
            horaInicio,
            horaFim,
            tipoEstudo
        }, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.LOGIN_SERVICE_URL + `agendamento/${id}`, this.httpOptions);
    }

    getAll(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + 'agendamento', this.httpOptions)
    };

}
