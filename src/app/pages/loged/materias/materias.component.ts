import { NotaMateria } from './../../../interface/notaMateria';
import { UserService } from './../../../service/user.service';
import { MateriaService } from './../../../service/materia.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Materia } from 'src/app/interface/materia';
import { NotaMateriaService } from 'src/app/service/notaMateria.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html'
})

export class MateriasComponent implements AfterViewInit {
  /* CONFIG TABELA DE NOTAS */
  displayedColumns: string[] = ['notaMateria', 'tipoNota', 'dataNota', 'acoes'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /* Alert */
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(
    private materiaService: MateriaService,
    private usuarioService: UserService,
    private notaMateriaService: NotaMateriaService) {
    this.refresh();
  }

  loaded: boolean = false;
  materias: Materia[] = []
  notas: NotaMateria[] = []
  tipos = ["Trabalho em Grupo", "Trabalho Individual", "Prova", "Atividade"]
  nomeMaterias = ["Matemática", "Física", "Biologia", "História", "Inglês"]

  /* CRUD Matéria */

  newMateria: any = {
    nome: null,
    descricao: null
  };

  saveMateria() {
    console.log(this.newMateria)
    if (this.newMateria.nome && !this.materias.includes(this.newMateria.nome)) {
      this.materiaService.create(this.newMateria.nome, this.newMateria.descricao).subscribe(
        () => {
          this.alertSucess("materia", "create");
          this.closeModal();
          this.refresh();
        },
        (err) => {
          this.alertError(err)
        }
      );
    }
  }

  editMateria(idMateria) {
    let toEdit;
    this.materias.forEach((materia) => {
      if (materia.idMateria === idMateria) {
        toEdit = materia as Materia;
        return;
      }
    })
    this.materiaService.update(idMateria, toEdit.nomeMateria, toEdit.descricao).subscribe(
      () => {
        this.alertSucess("materia", "update");
      },
      (err) => {
        this.alertError(err);
      }
    );
  }

  async delMateria(idMateria) {
    this.confDel().then((result) => {
      if (result.isConfirmed) {
        this.notas.forEach((nota) => {
          if (nota.idMateria === idMateria) {
            this.delNota(nota.idNotaMateria, true)
          }
        })
        this.materiaService.delete(idMateria).subscribe(
          () => {
            this.alertSucess("materia", "delete");
            this.materias.forEach((materia, index) => {
              if (materia.idMateria === idMateria) {
                this.materias.splice(index, 1);
                return;
              }
            })
          },
          err => {
            this.alertError(err)
          }
        );
      }
    })


  }

  /* CRUD Nota */
  newNota: any = {
    tipoNota: null,
    data: null,
    nota: null,
  }

  //VERIFIDADORES
  notaValida = true;
  dataValida = true;
  camposValidos = true;

  saveNota(idMateria) {
    this.notaValida = true;
    this.dataValida = true;
    this.camposValidos = true;

    //Campos preenchidos:
    if (this.newNota.tipoNota && this.newNota.nota && this.newNota.data) {
      //Campos Válidos:
      if (
        (this.newNota.nota >= 0 && this.newNota.nota <= 10) &&
        (new Date(this.newNota.data) <= new Date())
      ) {
        this.notaMateriaService.create(idMateria, this.newNota.nota, this.newNota.tipoNota, this.newNota.data + "T00:00:00").subscribe(
          () => {
            this.newNota = {}
            this.alertSucess("nota", "create")
            this.refresh();
          },
          err => {
            this.alertError(err);
          }
        );
      } else {
        if (!(this.newNota.nota >= 0 && this.newNota.nota <= 10)) {
          this.notaValida = false;
        }
        if (!(new Date(this.newNota.data) <= new Date())) {
          this.dataValida = false;
        }
      }
    } else {
      this.camposValidos = false;
    }
  }

  editNota() {
    this.notaValida = true;
    this.dataValida = true;
    this.camposValidos = true;
    if (this.notaToEdit.tipoNota && this.notaToEdit.notaMateria && this.notaToEdit.dataNota) {
      //Campos Válidos:
      if (
        (this.notaToEdit.notaMateria >= 0 && this.notaToEdit.notaMateria <= 10) &&
        (new Date(this.notaToEdit.dataNota) <= new Date())
      ) {
        this.notaMateriaService.update(this.notaToEdit.idNotaMateria, this.notaToEdit.idMateria, this.notaToEdit.notaMateria, this.notaToEdit.tipoNota, this.notaToEdit.dataNota + "T00:00:00").subscribe(
          () => {
            this.alertSucess("nota", "update");
            this.notas.forEach((nota, index) => {
              if (nota.idNotaMateria === this.notaToEdit.idNotaMateria) {
                this.notas[index] = this.notaToEdit;
                return;
              }
            })
            this.setTable(this.notaToEdit.idMateria);
            document.getElementById('closeModal').click();
            this.notaToEdit = {};
          },
          err => {
            this.alertError(err);
          }
        );
      } else {
        if (this.notaToEdit.notaMateria < 0 || this.notaToEdit.notaMateria > 10) {
          this.notaValida = false;
        }
        if ((new Date(this.notaToEdit.dataNota)) > new Date()) {
          this.dataValida = false;
        }
      }
    } else {
      this.camposValidos = false;
    }
  }

  delNota(idNotaMateria, fromDeleteMateria) {
    if (fromDeleteMateria) {
      this.notaMateriaService.delete(idNotaMateria).subscribe();
    } else {
      this.confDel().then((result) => {
        if (result.isConfirmed) {
          this.notaMateriaService.delete(idNotaMateria).subscribe(
            () => {
              let idMat
              this.alertSucess("nota", "delete");
              this.notas.forEach((nota, index) => {
                if (nota.idNotaMateria === idNotaMateria) {
                  idMat = nota.idMateria;
                  this.notas.splice(index, 1);
                  return;
                }
              })
              this.setTable(idMat);
            },
            err => {
              this.alertError(err);
            }
          );
        }
      })
    }
  }

  /* FUNÇÕES AUXILIARES */
  refresh() {
    this.loaded = false;
    this.usuarioService.getAllById().subscribe(
      (stringData: string) => {
        let data = JSON.parse(stringData)
        data = data[0]
        this.materias = data.materias;
        this.materias.sort((a, b) => (a.nomeMateria.toLowerCase() > b.nomeMateria.toLowerCase()) ? 1 : -1)
        this.notas = data.notasMateria;
        this.notas.sort((a, b) => (a.notaMateria > b.notaMateria) ? 1 : -1)
        this.loaded = true;
      })
  }

  dateToString(date: Date) {
    return `
    ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getFullYear()}`;
    /*  - ${date.getHours()}:${date.getMinutes()}`; */
  }

  setTable(idMateria) {
    this.dataSource.data = this.notas.reduce((a, v) => {
      if (v.idMateria === idMateria) {
        a.push({ idNotaMateria: v.idNotaMateria, notaMateria: v.notaMateria, tipoNota: v.tipoNota, dataNota: v.dataNota ? this.dateToString(new Date(v.dataNota)) : this.dateToString(new Date()) })
      }
      return a
    }, [])
  }

  notaToEdit: any = {
    idNotaMateria: null,
    idMateria: null,
    idUsuario: null,
    notaMateria: null,
    tipoNota: null,
    dataNota: null
  }
  setEditNota(idNotaMateria) {
    this.notas.forEach((nota) => {
      if (nota.idNotaMateria === idNotaMateria) {
        console.log(nota)
        this.notaToEdit = nota
        let date = new Date(nota.dataNota)
        this.notaToEdit.dataNota = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
      }
    })
  }

  closeModal() {
    this.newMateria = {}
  }

  alertSucess(type, crud) {
    let portTitle;
    let engTitle;
    switch (type) {
      case "materia":
        portTitle = 'Matéria'
        engTitle = 'Subject'
        break;
      case "nota":
        portTitle = 'Nota';
        engTitle = 'Grade';
        break;

    }
    switch (crud) {
      case "create":
        portTitle += " criado(a)"
        engTitle += " created"
        break;
      case "update":
        portTitle += " alterado(a)"
        engTitle += " changed"
        break;
      case "delete":
        portTitle += " deletado(a)"
        engTitle += " deleted"
        break;
    }

    if (localStorage.getItem("lang") === "pt-BR") {
      this.Toast.fire({
        icon: 'success',
        title: portTitle
      })
    } else {
      this.Toast.fire({
        icon: 'success',
        title: engTitle
      })
    }
  }

  alertError(err) {
    console.log(err);
    if (localStorage.getItem("lang") === "pt-BR") {
      this.Toast.fire({
        icon: 'error',
        title: 'Ocorreu um erro'
      })
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'An error has occurred'
      })
    }
  }

  async confDel() {
    if (localStorage.getItem('lang') === "pt-BR") {
      return Swal.fire({
        title: 'Tem certeza?',
        text: `A operação não pode ser desfeita`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      })
    } else {
      return Swal.fire({
        title: 'Are you sure?',
        text: `The operation cannot be undone`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })
    }
  }
}