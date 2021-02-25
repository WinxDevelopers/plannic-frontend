import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-notas-tipo',
  templateUrl: './notas-tipo.component.html'
})
export class NotasTipoComponent{
  public notas = {
    payload: [
      {
        materia: "História",
        nota: 5.5,
        tipo_nota: "Prova",
        data_nota: "01/01/2021"
      },
      {
        materia: "História",
        nota: 9.5,
        tipo_nota: "Trabalho",
        data_nota: "01/01/2021"
      },
    ]
  }

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: this.notas.payload.map(i => i.nota), label: 'Notas' }
  ];

  public chartLabels: Array<any> = this.notas.payload.map(i => i.tipo_nota);

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

}
