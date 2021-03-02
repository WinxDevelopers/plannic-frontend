import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Materia } from 'src/app/interface/materia';
import { NotaMateria } from 'src/app/interface/notaMateria';
import { GraficosService } from 'src/app/service/graficos.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'chart-notas-evolucao',
  templateUrl: './notas-evolucao.component.html'
})
export class NotasEvolucaoComponent {
  constructor(private graficoService: GraficosService,private usuarioService: UserService) { 
    this.getNotas(),  this.refresh(); }
  public idUsuario = localStorage.getItem('idUsuario');
  public notas;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;

  materias: Materia[] = []
  form: any = {
    idMateria: null
  };
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.getNotas();
    this.refresh();
  }


  public chartType: string = 'line';
  selected(){
    console.log(this.form.idMateria) // muda o id  quando seleciona no dropdown
  }

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


  getNotas() {
    this.graficoService.notaEvolucao(this.idUsuario, 60).subscribe(
      (notas) => {
        notas = JSON.parse(notas);
        this.notas = notas;
        this.chartDatasets = [
          { data: this.notas.map(i => i.notaMateria), label: 'Notas' }    
            ];     
        this.chartLabels = this.notas.map(i => i.dataNota);
      }
    )
  }

  refresh() {
    this.usuarioService.getAllById().subscribe(
      (stringData: string) => {
        let data = JSON.parse(stringData)
        data = data[0]
        this.materias = data.materias;
        this.dataSource.data = this.materias.map(m => {
          return {
            idMateria: m.idMateria,
            nomeMateria: m.nomeMateria,

          }
        });
      })
  }

}