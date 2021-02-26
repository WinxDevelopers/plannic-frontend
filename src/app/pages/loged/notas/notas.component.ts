import { NotaService } from '../../../service/nota.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Nota } from 'src/app/interface/nota';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html'
})

export class NotasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nomeMateria', 'tipoAvaliacao', 'dataNota', 'nota', 'acoes'];
  dataSource;
  form: any = {
    nome: null,
    descricao: null,
  };
  notas: Nota[]
  constructor(private notaService: NotaService) {
    this.dataSource = new MatTableDataSource<Nota>(ELEMENT_DATA)
    //this.getAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  save() {
    if (this.form.nome && this.form.descricao &&
      !this.notas.includes(this.form.nome))
      this.notaService.create(this.form.nome, this.form.descricao).subscribe(
        () => this.getAll()
      );
  }
  edit(id) {
    this.notaService.update(id, this.form.nome, this.form.descricao);
  }
  del(id) {
    this.notaService.delete(id);
  }
  getAll() {
    this.notaService.getAll().subscribe(
      (notas: Nota[]) => {
        this.dataSource = new MatTableDataSource<Nota>(notas)
      }
    )
  }
}

const ELEMENT_DATA: Nota[] = [
  { id: 1, nomeMateria: "Matemática", tipoAvaliacao: "Teste individual", dataNota:"13/10/2016", nota: 87},
  { id: 2, nomeMateria: "Inglês", tipoAvaliacao: "Trabalho individual", dataNota:"05/06/2017", nota: 90},
  { id: 3, nomeMateria: "Física", tipoAvaliacao: "Prova individual", dataNota:"08/07/2020", nota: 68},
  { id: 4, nomeMateria: "Geografia", tipoAvaliacao: "Prova em dupla", dataNota:"21/04/2019", nota: 71},
  { id: 5, nomeMateria: "Português", tipoAvaliacao: "Trabalho em grupo", dataNota:"17/08/2020", nota: 38},
];
