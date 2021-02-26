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
    this.materiaService.delete(idMateria);
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

/* const ELEMENT_DATA: Materia[] = [
  { idMateria: 1, nome: 'Hydrogen', tempo: 1.0079, media: 1.0079, descricao: 'asd' },
  { idMateria: 2, nome: 'Helium', tempo: 4.0026, media: 1.0079, descricao: 'He' },
  { idMateria: 3, nome: 'Lithium', tempo: 6.941, media: 1.0079, descricao: 'Li' },
  { idMateria: 4, nome: 'Beryllium', tempo: 9.0122, media: 1.0079, descricao: 'Be' },
  { idMateria: 5, nome: 'Boron', tempo: 10.811, media: 1.0079, descricao: 'B' },
  { idMateria: 6, nome: 'Carbon', tempo: 12.0107, media: 1.0079, descricao: 'C' },
  { idMateria: 7, nome: 'Nitrogen', tempo: 14.0067, media: 1.0079, descricao: 'N' },
  { idMateria: 8, nome: 'Oxygen', tempo: 15.9994, media: 1.0079, descricao: 'O' },
  { idMateria: 9, nome: 'Fluorine', tempo: 18.9984, media: 1.0079, descricao: 'F' },
  { idMateria: 10, nome: 'Neon', tempo: 20.1797, media: 1.0079, descricao: 'Ne' },
  { idMateria: 11, nome: 'Sodium', tempo: 22.9897, media: 1.0079, descricao: 'Na' },
  { idMateria: 12, nome: 'Magnesium', tempo: 24.305, media: 1.0079, descricao: 'Mg' },
  { idMateria: 13, nome: 'Aluminum', tempo: 26.9815, media: 1.0079, descricao: 'Al' },
  { idMateria: 14, nome: 'Silicon', tempo: 28.0855, media: 1.0079, descricao: 'Si' },
  { idMateria: 15, nome: 'Phosphorus', tempo: 30.9738, media: 1.0079, descricao: 'P' },
  { idMateria: 16, nome: 'Sulfur', tempo: 32.065, media: 1.0079, descricao: 'S' },
  { idMateria: 17, nome: 'Chlorine', tempo: 35.453, media: 1.0079, descricao: 'Cl' },
  { idMateria: 18, nome: 'Argon', tempo: 39.948, media: 1.0079, descricao: 'Ar' },
  { idMateria: 19, nome: 'Potassium', tempo: 39.0983, media: 1.0079, descricao: 'K' },
  { idMateria: 20, nome: 'Calcium', tempo: 40.078, media: 1.0079, descricao: 'Ca' },
]; */
