import { UserService } from './../../../service/user.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Materia } from 'src/app/interface/materia';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { Agendamento } from 'src/app/interface/agendamento';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent {

  /* "MATERIA": "Subject",
        "INTERVALO": "Time Range",
        "RECORRENCIA": "Recurrence",
        "METODO": "Study Method" */
  displayedColumns: string[] = ['materia', 'intervalo', 'recorrencia', 'tipoEstudo', 'acoes'];
  dataSource = new MatTableDataSource();
  form: any = {
    idMateria: null,
    recorrencia: null,
    intervaloData: null,
    intervaloInicio: null,
    intervaloFim: null,
  };
  idforEdit;
  materias: Materia[] = []
  agendamentos: Agendamento[] = []
  metodos = ["Autoexplicação", "Resumo", "Teste Prático", "Técnica Pomodoro", "Mapa Mental", "Outro"]
  recorrencias = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"]
  constructor(private agendamentoService: AgendamentoService, private usuarioService: UserService) {
    this.refresh();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  save() {
    this.agendamentoService.create(
      this.form.idMateria,
      this.form.intervaloData,
      this.form.intervaloInicio,
      this.form.intervaloFim,
      this.form.recorrencia,
      this.form.metodo,
    ).subscribe(
      () => this.refresh()
    );
  }

  openEditModal(idMateria) {
    this.idforEdit = idMateria;
    this.materias.forEach((materia) => {
      if (materia.idMateria == idMateria) {
        this.form.nome = materia.materia;
        this.form.descricao = materia.descricao;
      }
    })
  }

  closeModal() {
    this.form.nome = null;
    this.form.descricao = null;
  }

  /* edit() {
    this.agendamentoService.update(this.idforEdit, this.form.nome, this.form.descicao);
  } */

  del(idAgendamento) {
    this.agendamentoService.delete(idAgendamento).subscribe(() => this.refresh());
  }

  refresh() {
    this.usuarioService.getAllById().subscribe(
      (stringData: string) => {
        let data = JSON.parse(stringData)
        data = data[0]
        this.agendamentos = data.agendamentos;
        this.materias = data.materias;
        this.dataSource.data = this.agendamentos.map(a => {
          let mat;
          let data;
          this.materias.forEach(materia => {
            if (materia.idMateria === a.idMateria) {
              mat = materia.materia
            }
          })
          if (a.timestampInicio && a.timestampFim) {
            let dataIn = new Date(a.timestampInicio)
            let dataFim = new Date(a.timestampFim)
            //Dia
            data = dataIn.getDay()+"/"+dataIn.getMonth()+"/"+dataIn.getFullYear()+" ("+
            //Inicio
            dataIn.getHours()+":"+dataIn.getMinutes()+" - "+
            //Fim
            dataFim.getHours()+":"+dataIn.getMinutes()+")";
          }
          return {
            idAgendamento: a.idAgendamento,
            materia: mat,
            recorrencia: a.recorrencia,
            intervalo: data,
            timestampFim: a.timestampFim,
            tipoEstudo: a.tipoEstudo
          }
        });
      })
  }

}
