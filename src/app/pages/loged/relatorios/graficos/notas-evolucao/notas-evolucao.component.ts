import { Component } from '@angular/core';

@Component({
  selector: 'chart-notas-evolucao',
  templateUrl: './notas-evolucao.component.html'
})
export class NotasEvolucaoComponent {
  public notas = {
    payload: [
      {
        materia: "História",
        nota: 7.5,
        tipo_nota: "Média",
        data_nota: "01/01/2021"
      },
      {
        materia: "História",
        nota: 9.5,
        tipo_nota: "Média",
        data_nota: "03/01/2021"
      },
      {
        materia: "História",
        nota: 4.5,
        tipo_nota: "Média",
        data_nota: "07/01/2021"
      },
      {
        materia: "História",
        nota: 3.5,
        tipo_nota: "Média",
        data_nota: "18/01/2021"
      }
    ]
  }
  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: this.notas.payload.map(i => i.nota), label: this.notas.payload[0].materia }
  ];

  public chartLabels: Array<any> = this.notas.payload.map(i => i.data_nota);

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
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
}