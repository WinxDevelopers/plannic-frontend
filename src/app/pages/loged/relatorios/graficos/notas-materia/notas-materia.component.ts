import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-notas-materia',
  templateUrl: './notas-materia.component.html'
})
export class NotasMateriaComponent{
  public notas = {
    payload: [
      {
        materia: "História",
        nota: 7.5,
        tipo_nota: "Média",
        data_nota: "01/01/2021"
      },
      {
        materia: "Matemática",
        nota: 9.5,
        tipo_nota: "Média",
        data_nota: "01/01/2021"
      },
      {
        materia: "Física",
        nota: 4.5,
        tipo_nota: "Média",
        data_nota: "01/01/2021"
      },
      {
        materia: "Biologia",
        nota: 3.5,
        tipo_nota: "Média",
        data_nota: "01/01/2021"
      }
    ]
  }

  public chartType: string = 'horizontalBar';

  public chartDatasets: Array<any> = [
    { data: this.notas.payload.map(i => i.nota), label: 'Matérias' }
  ];

  public chartLabels: Array<any> = this.notas.payload.map(i => i.materia);

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
