import { Component, OnInit } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';

@Component({
  selector: 'chart-horas-estudo',
  templateUrl: './horas-estudo.component.html'
})
export class HorasEstudoComponent{
  constructor(private graficoService: GraficosService) { this.getNotas() }
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

  loaded: boolean = true;
  getNotas() {
    this.loaded = false;
    this.graficoService.notaHora().subscribe(
      (data) => {
        data = JSON.parse(data);
        this.notas = data;
        this.chartDatasets = [
          { data: this.notas.map(i => Math.floor(i.minEstudo/60)), label: 'Horas' }
        ];
        this.chartLabels = this.notas.map(i => i.nomeMateria);
        this.loaded = true;
      },
      err =>{
        console.log(err)
      }
    )
  }
}