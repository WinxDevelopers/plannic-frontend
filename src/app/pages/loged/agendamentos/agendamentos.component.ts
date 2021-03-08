import { UserService } from './../../../service/user.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Materia } from 'src/app/interface/materia';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { Agendamento } from 'src/app/interface/agendamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html'
})
export class AgendamentosComponent {
  
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
  recorrenciaInicio;
  recorrenciaFim;
  materias: Materia[] = []
  agendamentos: Agendamento[] = []
  metodos = ["Autoexplicação", "Resumo", "Teste Prático", "Técnica Pomodoro", "Mapa Mental", "Outro"]
  recorrencias = ["Nunca", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"]
  constructor(private agendamentoService: AgendamentoService,
    private usuarioService: UserService,
    private router: Router) {
    this.refresh();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  save() {
    this.recorrenciaInicio = this.form.dataInicio + "T12:00:00"
    this.recorrenciaFim = this.form.dataFim + "T12:00:00"
    this.agendamentoService.create(
      this.form.idMateria,
      this.recorrenciaInicio,
      this.recorrenciaFim,
      this.form.recorrencia,
      this.form.horaInicio,
      this.form.horaFim,
      this.form.metodo,
    ).subscribe(
      () => {
        this.refresh();
        this.closeModal()
      }
    );
  }

  openEditModal(idMateria) {
    this.idforEdit = idMateria;
    this.materias.forEach((materia) => {
      if (materia.idMateria == idMateria) {
        this.form.nome = materia.nomeMateria;
        this.form.descricao = materia.descricao;
      }
    })
  }

  closeModal() {
    this.form = {}
    this.recorrenciaInicio = null
    this.recorrenciaFim = null
  }

  /* edit() {
    this.agendamentoService.update(this.idforEdit, this.form.nome, this.form.descicao);
  } */

  del(idAgendamento) {
    this.agendamentoService.delete(idAgendamento).subscribe(() => this.refresh());
  }

  info() {
    this.router.navigate(['dashboard/metodos']);
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
          let datas;
          let data = a.minEstudo;
          this.materias.forEach(materia => {
            if (materia.idMateria === a.idMateria) {
              mat = materia.nomeMateria
            }
          })
          if (a.recorrenciaInicio && a.recorrenciaFim) {
            let dataIn = new Date(a.recorrenciaInicio)
            let dataFim = new Date(a.recorrenciaFim)
            //Dia
            datas = dataIn.getDate() + "/" + (dataIn.getMonth() + 1) + "/" + dataIn.getFullYear() + " (" +
              //Inicio
              (dataIn.getHours() + 3) + ":" + dataIn.getMinutes() + "0 - " +
              //Fim
              (dataFim.getHours() + 3) + ":" + dataIn.getMinutes() + "0)";
          }
          return {
            idAgendamento: a.idAgendamento,
            materia: mat,
            recorrencia: a.recorrencia,
            intervalo: data,
            tipoEstudo: a.tipoEstudo
          }
        });
      })
  }

}
