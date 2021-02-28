import { Component, OnInit } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';

@Component({
  selector: 'chart-horas-estudo',
  templateUrl: './horas-estudo.component.html'
})
export class HorasEstudoComponent{
  constructor(private graficoService: GraficosService) { this.getNotas() }
  public idUsuario = localStorage.getItem('idUsuario');
  public notas;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;

  public chartType: string = 'pie';

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 250, 220, .2)',
      borderColor: 'rgba(0, 213, 132, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  getNotas() {
    this.graficoService.notaHora(this.idUsuario).subscribe(
      (notas) => {
        notas = JSON.parse(notas);
        this.notas = notas;
        this.chartDatasets = [
          { data: this.notas.map(i => i.minEstudo), label: 'Horas' }
        ];
        this.chartLabels = this.notas.map(i => i.nomeMateria);
      }
    )
  }
}