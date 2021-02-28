import { Component, OnInit } from '@angular/core';
import { GraficosService } from 'src/app/service/graficos.service';

@Component({
  selector: 'chart-notas-materia',
  templateUrl: './notas-materia.component.html'
})
export class NotasMateriaComponent {
  constructor(private graficoService: GraficosService) { this.getNotas() }
  public idUsuario = localStorage.getItem('idUsuario');
  public notas;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;

  public chartType: string = 'horizontalBar';

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
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

  getNotas() {
    this.graficoService.notaMateria(this.idUsuario).subscribe(
      (notas) => {
        notas = JSON.parse(notas);
        this.notas = notas;
        this.chartDatasets = [
          { data: this.notas.map(i => i.notaMateria.toFixed(2)), label: 'Matéria' }
        ];
        this.chartLabels = this.notas.map(i => i.nomeMateria);
      }
    )
  }
}
