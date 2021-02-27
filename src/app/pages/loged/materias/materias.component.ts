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
  dataSource = new MatTableDataSource<Materia>();
  form: any = {
    nome: null,
    descricao: null,
  };
  idforEdit;
  materias: Materia[] = []
  constructor(private materiaService: MateriaService) { this.getAll() }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  save() {
    if (this.form.nome && this.form.descricao &&
      !this.materias.includes(this.form.nome))
      this.materiaService.create(this.form.nome, this.form.descricao).subscribe(
        () => this.getAll()
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
    //this.materiaService.update(idMateria, this.form.nome, this.form.descricao);
  }

  closeModal() {
    this.form.nome = null;
    this.form.descricao = null;
  }

  edit() {
    this.materiaService.update(this.idforEdit, this.form.nome, this.form.descicao);
  }

  del(idMateria) {
    console.log(idMateria)
    this.materiaService.delete(idMateria).subscribe(()=> this.getAll());
  }

  getAll() {
    this.materiaService.getAll().subscribe(
      (materias) => {
        materias = JSON.parse(materias);
        this.materias = materias;
        materias = materias.map((m) => { return { idMateria: m.idMateria, nome: m.materia, tempo: 123, media: 456 } })
        this.dataSource.data = materias
      }
    )
  }
}