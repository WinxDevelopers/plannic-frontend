import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TutoriaService {
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

    // Aluno
    // Cria um aluno em busca de um tutor
    createAluno(idMateriaBase: number): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'tutoria/aluno', {
            idUsuarioAluno: this.idUsuario,
            idMateriaBase
        }, this.httpOptions);
    }

    // Busca todos os alunos buscando tutor na matéria escolhida (exceto o usuário que faz a requisição)
    getAlunosByMateria(idMateriaBase: number): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `tutoria/aluno/${this.idUsuario}/materia/${idMateriaBase}`, this.httpOptions)
    };    
    
    // Busca todos os alunos buscando tutor (exceto o usuário que faz a requisição)
    getAlunos(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `tutoria/aluno/${this.idUsuario}`, this.httpOptions)
    };
    

    // Deleta aluno
    deleteAluno(idAluno: number): Observable<any> {
        return this.http.delete(this.LOGIN_SERVICE_URL + `tutoria/aluno/${idAluno}`, this.httpOptions);
    }

    // Busca todos os alunos buscando tutor
    getAllAlunos(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + 'tutoria/aluno', this.httpOptions)
    };

    //Tutor
    // Cria um tutor disponível para um aluno
    createTutor(idMateriaBase: number): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'tutoria/tutor', {
            idUsuarioTutor: this.idUsuario,
            idMateriaBase
        }, this.httpOptions);
    }

    // Busca todos os tutores disponíveis na matéria escolhida (exceto o usuário que faz a requisição)
    getTutoresByMateria(idMateriaBase: number): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `tutoria/tutor/${this.idUsuario}/materia/${idMateriaBase}`, this.httpOptions)
    };

    // Busca todos os tutores disponíveis (exceto o usuário que faz a requisição)
    getTutores(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `tutoria/tutor/${this.idUsuario}`, this.httpOptions)
    };

    // Deleta tutor
    deleteTutor(idTutor: number): Observable<any> {
        return this.http.delete(this.LOGIN_SERVICE_URL + `tutoria/tutor/${idTutor}`, this.httpOptions);
    }

    // Busca todos os tutores
    getAllTutores(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + 'tutoria/tutor', this.httpOptions)
    };

    // Tutoria
    // Aluno encontrando tutor e iniciando tutoria
    createTutoriaByAluno(idMateriaBase: number, idUsuarioTutor: number): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'tutoria/cadastro', {
            idUsuarioAluno: this.idUsuario,
            idUsuarioTutor,
            idMateriaBase
        }, this.httpOptions);
    }

    // Tutor encontrando aluno e iniciando tutoria
    createTutoriaByTutor(idMateriaBase: number, idUsuarioAluno: number): Observable<any> {
        return this.http.post(this.LOGIN_SERVICE_URL + 'tutoria/cadastro', {
            idUsuarioAluno,
            idUsuarioTutor: this.idUsuario,
            idMateriaBase
        }, this.httpOptions);
    }

    // Encerrar tutoria
    encerrarTutoria(id: number): Observable<any> {
        return this.http.delete(this.LOGIN_SERVICE_URL + `tutoria/cadastro/${this.idUsuario}/${id}`, this.httpOptions);
    }

    // Busca todas as tutorias
    getAllTutoria(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + 'tutoria/cadastro', this.httpOptions)
    };

    // Busca todas as tutorias em que o usuário é aluno
    getAllUserAluno(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `tutoria/cadastro/aluno/${this.idUsuario}`, this.httpOptions)
    };

    // Busca todas as tutorias em que o usuário é tutor
    getAllUserTutor(): Observable<any> {
        return this.http.get(this.LOGIN_SERVICE_URL + `tutoria/cadastro/tutor/${this.idUsuario}`, this.httpOptions)
    };
}
