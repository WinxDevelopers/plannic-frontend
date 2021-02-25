import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-horas-estudo',
  templateUrl: './horas-estudo.component.html'
})
export class HorasEstudoComponent{
  public notas = {
    payload: [
      {
        materia: "História",
        nota: 8.5,
        tipo_nota: "Prova",
        tipo_estudo: "Resumo",
        data_nota: "01/01/2021",
        horas: 24
      },
      {
        materia: "Matemática",
        nota: 6.5,
        tipo_nota: "Trabalho",
        tipo_estudo: "Pomodoro",
        data_nota: "01/01/2021",
        horas: 15
      },
      {
        materia: "Física",
        nota: 9.5,
        tipo_nota: "Trabalho",
        tipo_estudo: "Teste Prático",
        data_nota: "01/01/2021",
        horas: 22
      },
      {
        materia: "Química",
        nota: 9.5,
        tipo_nota: "Trabalho",
        tipo_estudo: "Teste Prático",
        data_nota: "01/01/2021",
        horas: 8
      },
      {
        materia: "Biologia",
        nota: 9.5,
        tipo_nota: "Trabalho",
        tipo_estudo: "Teste Prático",
        data_nota: "01/01/2021",
        horas: 9
      },
    ]
  }

  public chartType: string = 'radar';

  public chartDatasets: Array<any> = [
    { data: this.notas.payload.map(i => i.horas) }
  ];

  public chartLabels: Array<any> = this.notas.payload.map(i => i.materia);

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

}