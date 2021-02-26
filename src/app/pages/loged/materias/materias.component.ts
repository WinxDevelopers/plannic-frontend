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
  dataSource;
  form: any = {
    nome: null,
    descricao: null,
  };
  materias: Materia[]
  constructor(private materiaService: MateriaService) {
    this.dataSource = new MatTableDataSource<Materia>(ELEMENT_DATA)
    this.getAll();
  }

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
  edit(id) {
    this.materiaService.update(id, this.form.nome, this.form.descricao);
  }
  del(id) {
    this.materiaService.delete(id);
  }
  getAll() {
    this.materiaService.getAll().subscribe(
      (materias: Materia[]) => {
        console.log(materias);
      }
    )
  }
}

const ELEMENT_DATA: Materia[] = [
  { id: 1, nome: 'Hydrogen', tempo: 1.0079, media: 1.0079, descricao: 'asd' },
  { id: 2, nome: 'Helium', tempo: 4.0026, media: 1.0079, descricao: 'He' },
  { id: 3, nome: 'Lithium', tempo: 6.941, media: 1.0079, descricao: 'Li' },
  { id: 4, nome: 'Beryllium', tempo: 9.0122, media: 1.0079, descricao: 'Be' },
  { id: 5, nome: 'Boron', tempo: 10.811, media: 1.0079, descricao: 'B' },
  { id: 6, nome: 'Carbon', tempo: 12.0107, media: 1.0079, descricao: 'C' },
  { id: 7, nome: 'Nitrogen', tempo: 14.0067, media: 1.0079, descricao: 'N' },
  { id: 8, nome: 'Oxygen', tempo: 15.9994, media: 1.0079, descricao: 'O' },
  { id: 9, nome: 'Fluorine', tempo: 18.9984, media: 1.0079, descricao: 'F' },
  { id: 10, nome: 'Neon', tempo: 20.1797, media: 1.0079, descricao: 'Ne' },
  { id: 11, nome: 'Sodium', tempo: 22.9897, media: 1.0079, descricao: 'Na' },
  { id: 12, nome: 'Magnesium', tempo: 24.305, media: 1.0079, descricao: 'Mg' },
  { id: 13, nome: 'Aluminum', tempo: 26.9815, media: 1.0079, descricao: 'Al' },
  { id: 14, nome: 'Silicon', tempo: 28.0855, media: 1.0079, descricao: 'Si' },
  { id: 15, nome: 'Phosphorus', tempo: 30.9738, media: 1.0079, descricao: 'P' },
  { id: 16, nome: 'Sulfur', tempo: 32.065, media: 1.0079, descricao: 'S' },
  { id: 17, nome: 'Chlorine', tempo: 35.453, media: 1.0079, descricao: 'Cl' },
  { id: 18, nome: 'Argon', tempo: 39.948, media: 1.0079, descricao: 'Ar' },
  { id: 19, nome: 'Potassium', tempo: 39.0983, media: 1.0079, descricao: 'K' },
  { id: 20, nome: 'Calcium', tempo: 40.078, media: 1.0079, descricao: 'Ca' },
];
