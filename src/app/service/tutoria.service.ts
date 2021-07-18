import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TutoriaService {
    public REQUEST_URL = `${environment.API_URL}`;
    public token = localStorage.getItem('token');
    public idUsuario = localStorage.getItem('idUsuario');

    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.token}`,
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'Content-Security-Policy': 'Content-Security-Policy: default-src https://plannic-back.herokuapp.com; default-src http://localhost:8080',
            'X-Frame-Options': 'SAMEORIGIN',
            'X-Content-Type-Options': 'nosniff always',
            'Referrer-Policy': 'no-referrer',
            'Permissions-Policy': 'geolocation=(self "https://plannic-back.herokuapp.com" "http://localhost:8080")'
        }),
        responseType: 'text' as 'json'
    }
    constructor(private http: HttpClient) { }

    /* USER */
    // Cria uma tutoria sem tutor
    createAluno(idMateriaBase: number): Observable<any> {
        return this.http.post(this.REQUEST_URL + 'tutoria/aluno', {
            idUsuarioAluno: this.idUsuario,
            idMateriaBase
        }, this.httpOptions);
    }
    // cadastrados por IdUsuario
    getSemTutorById(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `tutoria/alunos/${this.idUsuario}`, this.httpOptions);
    }
    // Deleta uma tutoria sem tutor
    deleteAluno(idAluno: number): Observable<any> {
        return this.http.delete(this.REQUEST_URL + `tutoria/aluno/${idAluno}`, this.httpOptions);
    }
    // Aluno encontrando tutor
    createTutoriaByAluno(idMateriaBase: number, idUsuarioTutor: number): Observable<any> {
        return this.http.post(this.REQUEST_URL + 'tutoria/cadastro', {
            idUsuarioAluno: this.idUsuario,
            idUsuarioTutor,
            idMateriaBase
        }, this.httpOptions);
    }

    // Cria uma tutoria sem aluno
    createTutor(idMateriaBase: number): Observable<any> {
        return this.http.post(this.REQUEST_URL + 'tutoria/tutor', {
            idUsuarioTutor: this.idUsuario,
            idMateriaBase
        }, this.httpOptions);
    }
    //  tutoria sem aluno
    getSemAlunoById(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `tutoria/tutores/${this.idUsuario}`, this.httpOptions);
    }
    // Deleta uma tutoria sem aluno
    deleteTutor(idTutor: number): Observable<any> {
        return this.http.delete(this.REQUEST_URL + `tutoria/tutor/${idTutor}`, this.httpOptions);
    }
    // Tutor encontrando aluno
    createTutoriaByTutor(idMateriaBase: number, idUsuarioAluno: number): Observable<any> {
        return this.http.post(this.REQUEST_URL + 'tutoria/cadastro', {
            idMateriaBase,
            idUsuarioAluno,
            idUsuarioTutor: this.idUsuario,
        }, this.httpOptions);
    }

    // Encerrar tutoria
    encerrarTutoria(idTutoria: number): Observable<any> {
        return this.http.delete(this.REQUEST_URL + `tutoria/cadastro/${this.idUsuario}/${idTutoria}`, this.httpOptions);
    }
    // Cancelatutoria
    cancelaTutoria(idTutoria: number): Observable<any> {
        return this.http.delete(this.REQUEST_URL + `tutoria/cancela/${this.idUsuario}/${idTutoria}`, this.httpOptions);
    }

    // Busca todas as tutorias em que o usuário é aluno e que possuem tutor
    getAllUserAluno(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `tutoria/cadastro/aluno/${this.idUsuario}`, this.httpOptions)
    };

    // Busca todas as tutorias em que o usuário é tutor e que possuem aluno
    getAllUserTutor(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `tutoria/cadastro/tutor/${this.idUsuario}`, this.httpOptions)
    };

    /* COMUNIDADE */
    // Busca todos os alunos buscando tutor (exceto o usuário que faz a requisição)
    getAllAlunosProcurandoTutor(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `tutoria/aluno/${this.idUsuario}`, this.httpOptions)
    };
    // Busca todos os alunos buscando tutor na matéria escolhida (exceto o usuário que faz a requisição)
    getAllAlunosByMateria(idMateriaBase: number): Observable<any> {
        return this.http.get(this.REQUEST_URL + `tutoria/aluno/${this.idUsuario}/materia/${idMateriaBase}`, this.httpOptions)
    };

    // Busca todos os tutores disponíveis (exceto o usuário que faz a requisição)
    getTutoresProcurandoAluno(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `tutoria/tutor/${this.idUsuario}`, this.httpOptions)
    };
    // Busca todos os tutores disponíveis na matéria escolhida (exceto o usuário que faz a requisição)
    getAllTutoresByMateria(idMateriaBase: number): Observable<any> {
        return this.http.get(this.REQUEST_URL + `tutoria/tutor/${this.idUsuario}/materia/${idMateriaBase}`, this.httpOptions)
    };
}
