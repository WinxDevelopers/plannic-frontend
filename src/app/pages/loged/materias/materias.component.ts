import { UserService } from './../../../service/user.service';
import { MateriaService } from './../../../service/materia.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Materia } from 'src/app/interface/materia';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html'
})

export class MateriasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'tempo', 'media', 'acoes'];
  dataSource = new MatTableDataSource();
  form: any = {
    nome: null,
    descricao: null,
  };
  idforEdit;
  materias: Materia[] = []
  nomeMaterias = ["Matemática", "Física", "Biologia", "História", "Inglês", "Outra"]
  constructor(private materiaService: MateriaService, private usuarioService: UserService) {
    this.refresh();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  save() {
    if (this.form.nome && !this.materias.includes(this.form.nome)) {
      this.materiaService.create(this.form.nome, this.form.descricao).subscribe(
        () => this.refresh()
      );
    }
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
    this.form.nome = null;
    this.form.descricao = null;
  }

  edit() {
    this.materiaService.update(this.idforEdit, this.form.nome, this.form.descicao);
  }

  del(idMateria) {
    this.materiaService.delete(idMateria).subscribe(() => this.refresh());
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
            nome: m.nomeMateria,
            tempo: m.tempo || "----",
            media: m.media || "----",
          }
        });
      })
  }
}