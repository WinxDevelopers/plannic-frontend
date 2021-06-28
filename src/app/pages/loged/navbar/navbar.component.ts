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
  public canVote = localStorage.getItem("idUsuario") == '11'

  constructor(
    private materiaService: MateriaService,
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.nome = localStorage.getItem('nome')
    this.materiaService.getAllSugestao().subscribe(
      (data) => {
        this.sugestoes = JSON.parse(data)
        console.log(this.sugestoes)
      }
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
    sug.votos += voto
    sug.totalVotos++;
    console.log(sug)
    //this.materiaService.updateSugestao(sug)
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['../']);
  }
}
