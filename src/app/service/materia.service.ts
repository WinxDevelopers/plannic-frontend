import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MateriaService {
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

    create(idMateriaBase: number, nomeMateria: string, descricao: string): Observable<any> {
        return this.http.post(this.REQUEST_URL + 'materia/cadastro', {
            idUsuario: this.idUsuario,
            nomeMateria,
            descricao,
            idMateriaBase
        }, this.httpOptions);
    }

    update(idMateria: number, idMateriaBase: number, nomeMateria: string, descricao: string): Observable<any> {
        return this.http.put(this.REQUEST_URL + 'materia', {
            idMateria,
            idMateriaBase,
            idUsuario: this.idUsuario,
            nomeMateria,
            descricao,
        }, this.httpOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.REQUEST_URL + `materia/${id}`, this.httpOptions);
    }

    getAll(): Observable<any> {
        return this.http.get(this.REQUEST_URL + 'materia', this.httpOptions)
    };

    // Buscar Matérias Base
    createBase(materiaBase: string): Observable<any> {
        return this.http.post(this.REQUEST_URL + 'materia/cadastro/base', {
            idUsuario: this.idUsuario,
            materiaBase
        }, this.httpOptions);
    }

    getAllBase(): Observable<any> {
        return this.http.get(this.REQUEST_URL + 'materia/base', this.httpOptions)
    };

    //CRUD Materiais

    newMaterial(idMateria, material, nomeMaterial, tipoMaterial, publico): Observable<any> {
        return this.http.post(this.REQUEST_URL + 'material/cadastro', {
            idUsuario: this.idUsuario,
            idMateria,
            material,
            nomeMaterial,
            tipoMaterial,
            publico
        }, this.httpOptions);
    }


    updateMaterial(idMaterial, idMateria, material, nomeMaterial, tipoMaterial, publico): Observable<any> {
        return this.http.put(this.REQUEST_URL + 'material', {
            idUsuario: this.idUsuario,
            idMateria,
            idMaterial,
            material,
            nomeMaterial,
            tipoMaterial,
            publico
        }, this.httpOptions);
    }

    deleteMaterial(id: number): Observable<any> {
        return this.http.delete(this.REQUEST_URL + `material/${id}`, this.httpOptions);
    }

    //Busca todos os materiais compartilhados com o publico por matéria
    getAllMaterialPublico(idMateriaBase): Observable<any> {
        return this.http.get(this.REQUEST_URL + `material/publico/${this.idUsuario}/${idMateriaBase}`, this.httpOptions)
    };

    //Busca todos os materiais do usuário por matéria
    getAllMaterialByMateria(idMateriaBase): Observable<any> {
        return this.http.get(this.REQUEST_URL + `material/${this.idUsuario}${idMateriaBase}`, this.httpOptions)
    };

    //Busca todos os materiais do usuário
    getAllMaterial(): Observable<any> {
        return this.http.get(this.REQUEST_URL + `material/${this.idUsuario}`, this.httpOptions)
    };

    //Busca o material por ID
    getMaterialById(idMaterial): Observable<any> {
        return this.http.get(this.REQUEST_URL + `material/download/${idMaterial}`, this.httpOptions)
    };

    // Sugestão de Matérias
    createSugestao(nomeMateria: string): Observable<any> {
        return this.http.post(this.REQUEST_URL + 'materia/cadastro/sugestoes', {
            idUsuario: this.idUsuario,
            nomeMateria
        }, this.httpOptions);
    }

    updateSugestao(sugestao: any): Observable<any> {
        return this.http.put(this.REQUEST_URL + 'materia/sugestoes', {
            idSugestoesMateria: sugestao.idSugestoesMateria,
            idUsuario: this.idUsuario,
            nomeMateria: sugestao.nomeMateria,
            votos: sugestao.votos,
            totalVotos: sugestao.totalVotos,
            faltaVotar: sugestao.faltaVotar
        }, this.httpOptions);
    }

    getAllSugestao(): Observable<any> {
        return this.http.get(this.REQUEST_URL + 'materia/sugestoes', this.httpOptions)
    };
}
