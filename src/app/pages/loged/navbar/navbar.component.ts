import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MateriaService } from 'src/app/service/materia.service';

@Component({
  selector: 'dash-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  public nome: string;
  public sugestoes: any[] = [];
  public lang = localStorage.getItem("lang");
  public isAdm = false;
  public idUser = localStorage.getItem("idUsuario");

  constructor(
    private userService: UserService,
    private materiaService: MateriaService,
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.nome = localStorage.getItem('nome')
    this.userService.userType().subscribe(
      (userInfos: string) => {
        let type = JSON.parse(userInfos)[0].idfuncao;
        if (type = 1) {
          this.materiaService.getAllSugestao().subscribe(
            (data) => {
              this.sugestoes = JSON.parse(data)
              if (this.sugestoes.length > 0) {
                let paraTirar = [];
                this.sugestoes.forEach((sugestao) => {
                  if (sugestao.faltaVotar) {
                    if (sugestao.faltaVotar.split("_").indexOf(this.idUser) == -1) {
                      paraTirar.push(sugestao.idSugestoesMateria)
                    }
                  }
                })
                paraTirar.forEach((idSugestoesMateria) => {
                  this.sugestoes = this.sugestoes.filter(sug => sug.idSugestoesMateria != idSugestoesMateria)
                })
              }
              this.isAdm = true;
            },
            (err) => console.log(err)
          )
        }
      },
      (err) => console.log(err)
    )
  }

  updateSugestao(id, voto) {
    let sug;
    this.sugestoes.forEach(sugestao => {
      if (sugestao.idSugestoesMateria === id) {
        sug = sugestao;
        return;
      }
    })
    sug.faltaVotar = sug.faltaVotar
      ? sug.faltaVotar.split("_").filter(id => id != this.idUser).join("_")
      : "";
    sug.votos += voto;
    sug.totalVotos++;
    console.log(sug)
    /* this.materiaService.updateSugestao(sug).subscribe(
      () => {
        this.sugestoes = this.sugestoes.filter(sugestao => sugestao.idSugestoesMateria!=sug.idSugestoesMateria)
      },
      err => console.log(err)
    ) */
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['../']);
  }
}
