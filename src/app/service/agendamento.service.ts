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
                                   'Authorization': `Bearer ${this.token}` }),
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
