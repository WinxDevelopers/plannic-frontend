import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.API_URL}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public idUsuario = localStorage.getItem('idUsuario')
  public token = localStorage.getItem('token')

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Security-Policy': 'Content-Security-Policy: default-src https://plannic-back.herokuapp.com https://api.telegram.org/; default-src http://localhost:8080 https://api.telegram.org/',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff always',
      'Referrer-Policy': 'no-referrer',
      'Permissions-Policy': 'geolocation=(self "https://plannic-back.herokuapp.com" "http://localhost:8080" "https://api.telegram.org/")'
    }),
    responseType: 'text' as 'json'
  }

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllInfosById() {
    return this.http.get(API_URL + `usuario/${this.idUsuario}`, this.httpOptions)
  };

  delete() {
    return this.http.delete(API_URL + `usuario/${this.idUsuario}`, this.httpOptions)
  }

  edit(nome: string, email: string, notificacao: string) {
    return this.http.put(API_URL + `usuario`, {
      idUsuario: this.idUsuario,
      nome,
      email/*, 
      notificacao*/
    }, this.httpOptions)
  }

  changePass(password) {
    return this.http.put(API_URL + `usuario/redefinicao`, {
      idUsuario: this.idUsuario,
      password
    }, this.httpOptions)
  }

  userType() {
    //1 - Admin / 2 - User
    return this.http.get(API_URL + `usuario/funcao/${this.idUsuario}`, this.httpOptions)
  };

  //Telegram
  telegramObj(): Observable<any> {
    return this.http.get("https://api.telegram.org/bot1837445567:AAEcp__9KjdGBCXlZijPu34JqWgJazjm-Wo/getUpdates")
  }
  getTelegramID(): Observable<any> {
    return this.http.get(API_URL + `usuariotelegram/${this.idUsuario}`, this.httpOptions);
  }
  addTelegramID(idTelegram: string, username: string): Observable<any> {
    return this.http.post(API_URL + `usuariotelegram/cadastro`, {
      idTelegram,
      username,
      idUsuario: this.idUsuario,
    }, this.httpOptions);
  }

  //NotasUsuario
  //Busca avaliações pendentes em que o usuário precisa dar nota
  getAvaliacoesPendentes() {
    return this.http.get(API_URL + `notasusuario/${this.idUsuario}`, this.httpOptions)
  };

  //Nota que o usuário deu
  newAvaliacao({idNotaUsuario, idAvaliado, idTutoria, nota, idMateriaBase}) {
    return this.http.put(API_URL + `notasusuario`,  {
      idNotaUsuario,
      idAvalia: this.idUsuario, //Usuário que avalia
      idAvaliado, //Usuário avaliado
      idTutoria,
      idMateriaBase,
      nota,
      ativo: false //Sempre falso
    }, this.httpOptions)
  }

  //Busca a nota média do usuário
  getNota() {
    return this.http.get(API_URL + `notasusuario/nota/${this.idUsuario}`, this.httpOptions)
  };
}