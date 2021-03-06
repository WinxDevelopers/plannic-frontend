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
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
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