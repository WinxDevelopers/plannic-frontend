import { Component, OnInit } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';

@Component({
  selector: 'badges',
  templateUrl: './badges.component.html'
})
export class BadgesComponent implements OnInit {
  constructor(
    private graficoService: GraficosService
  ) { }

  public notaMenor;
  public notaMaior;
  public buscaTutor = false;
  public sejaTutor = false;

  ngOnInit() {
    this.getNotas();
  }

  getNotas() {
    this.graficoService.notaMenor().subscribe(
      (notaMenor) => {
        notaMenor = JSON.parse(notaMenor);
        console.log(notaMenor)
        if (!notaMenor || notaMenor.length === 0) {
          this.buscaTutor = false;
        } else {
          this.buscaTutor = true;
          this.notaMenor = notaMenor[0];
        }

        this.graficoService.notaMaior().subscribe(
          (notaMaior) => {
            notaMaior = JSON.parse(notaMaior);
            console.log(notaMaior)
            if (!notaMaior || notaMaior.length === 0) {
              this.sejaTutor = false;
            } else {
              this.notaMaior = notaMaior[0];
              this.sejaTutor = true;
            }
          }
        )
      }
    )
  }
}