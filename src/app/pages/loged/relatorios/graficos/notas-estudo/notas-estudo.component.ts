import { Component, OnInit } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';

@Component({
  selector: 'chart-notas-estudo',
  templateUrl: './notas-estudo.component.html'
})
export class NotasEstudoComponent implements OnInit{
  constructor(private graficoService: GraficosService) { this.getNotas() }
  public notas;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;

  ngOnInit() {
    this.getNotas();
  }

  public chartType: string = 'bar';

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];
  
  public chartOptions: any = {
    responsive: true,
      scales: {
        xAxes: [{
          stacked: true
          }],
        yAxes: [
        {
          stacked: true
        }
      ]
    }
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  loaded: boolean = true;
  getNotas() {
    this.loaded = false;
    this.graficoService.notaEstudo().subscribe(
      (notas) => {
        notas = JSON.parse(notas);
        this.notas = notas;
        this.chartDatasets = [
          { data: this.notas.map(i => i.nota.toFixed(2)), label: 'Notas' }
        ];     
        this.chartLabels = this.notas.map(i => i.tipoEstudo);
        this.loaded = true;
      }
    )
  }
}
