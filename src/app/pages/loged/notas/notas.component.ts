import { Materia } from 'src/app/interface/materia';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NotaMateria } from 'src/app/interface/notaMateria';
import { MatTableDataSource } from '@angular/material/table';
import { NotaMateriaService } from 'src/app/service/notaMateria.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html'
})

export class NotasComponent implements AfterViewInit {
  //displayedColumns: string[] = ['nomeMateria', 'tipoAvaliacao', 'dataNota', 'nota', 'acoes'];
  displayedColumns: string[] = ["materia", "nota", "tipo", "data", 'acoes'];
  dataSource = new MatTableDataSource();;
  form: any = {
    idMateria: null,
    tipoNota: null,
    nota: null,
    data: null
  };
  idForEdit;
  notas: NotaMateria[]
  materias: Materia[]
  tipos = ["Trabalho em Grupo", "Trabalho Individual", "Prova", "Atividade"]
  constructor(private notaMateriaService: NotaMateriaService,
    private usuarioService: UserService) {
    this.refresh();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  save() {
    if (this.form.tipoNota && this.form.nota && this.form.data){
      this.notaMateriaService.create(this.form.idMateria, this.form.nota, this.form.tipoNota, this.form.data).subscribe(
        () => this.refresh()
      );
    }
  }

  openEditModal(idNota) {
    this.idForEdit = idNota;
    this.notas.forEach((nota) => {
      if (nota.idNotaMateria == idNota) {
      }
    })
  }

  closeModal() {
    this.form.nome = null;
    this.form.descricao = null;
  }

  edit() {
    this.notaMateriaService.update(this.idForEdit, this.form.nota, this.form.tipo, this.form.data);
  }

  del(id) {
    this.notaMateriaService.delete(id);
  }

  refresh() {
    this.usuarioService.getAllById().subscribe(
      (stringData: string) => {
        let data = JSON.parse(stringData)
        data = data[0]
        this.notas = data.notasMateria;
        this.materias = data.materias;
        this.dataSource.data = this.notas.map(n => {
          let mat;
          let data;
          this.materias.forEach(materia => {
            if (materia.idMateria === n.idMateria) {
              mat = materia.materia
            }
          })
          data = n.dataNota.replace("T", " ").replace(".", " ");
          data = data.split(" ");
          data = data[0] + " " + data[1];
          return {
            id: n.idNotaMateria,
            materia: mat,
            nota: n.notaMateria,
            tipo: n.tipoNota,
            data: data
          }
        });
      })
  }

}
