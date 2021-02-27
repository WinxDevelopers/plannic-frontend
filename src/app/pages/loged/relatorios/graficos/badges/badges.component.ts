import { Component, OnInit} from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';

@Component({
  selector: 'badges',
  templateUrl: './badges.component.html'
})
export class BadgesComponent implements OnInit{
  constructor(
    private graficoService:GraficosService
  ){}

  public nomeUsuario = localStorage.getItem('nome')
  public idUsuario = localStorage.getItem('idUsuario')
  public notaMenor;
  public notaMaior;
  public buscaTutor = false;
  public sejaTutor = false;
  
  ngOnInit() {
    this.menorNota();
    this.maiorNota();
  }

  menorNota() {
    this.graficoService.notaMenor(this.idUsuario).subscribe(
      (notaMenor) => {
        if (!notaMenor) {
          this.buscaTutor = false;
        } else {
          this.buscaTutor = true;
          notaMenor = JSON.parse(notaMenor);
          this.notaMenor = notaMenor;
        }
      }
    )
  }

  maiorNota() {
    this.graficoService.notaMaior(this.idUsuario).subscribe(
      (notaMaior) => {
        if (!notaMaior) {
          this.sejaTutor = false;
        } else {
          notaMaior = JSON.parse(notaMaior);
          this.notaMaior = notaMaior;
          console.log(this.notaMaior[0]);
          this.sejaTutor = true;
        }
      }
    )
  }
}