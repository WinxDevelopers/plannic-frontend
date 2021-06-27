import { NotaMateria } from './../../../interface/notaMateria';
import { UserService } from './../../../service/user.service';
import { MateriaService } from './../../../service/materia.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Materia } from 'src/app/interface/materia';
import { NotaMateriaService } from 'src/app/service/notaMateria.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class MateriasComponent implements AfterViewInit {
  /* CONFIG TABELA DE NOTAS */
  notasXmaterias: NotaMateria[] = [];
  displayedColumns: string[] = ['Nota', 'Tipo', 'Data', ' '];
  dataSource: MatTableDataSource<NotaMateria>;
  expandedElement: NotaMateria | null;
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
    this.dataSource = new MatTableDataSource([]);
    this.refresh();
  }

  loaded: boolean = false;
  materias: Materia[] = [];
  notas: NotaMateria[] = [];
  tipos = ["Trabalho em Grupo", "Trabalho Individual", "Prova", "Atividade"];
  idUsuario = parseInt(localStorage.getItem('idUsuario'));

  /* CRUD Matéria */
  newMateria: any = {
    nome: null,
    descricao: null,
    camposVal: true,
  };

  onChange(event, type) {
    if (event) {
      if (type === "create") {
        this.newMateria.nome = event.nomeMateria;
        this.newMateria.descricao = event.descricao;
      } else {
        this.materiaToEdit.nome = event.nomeMateria;
        this.materiaToEdit.descricao = event.descricao;
      }
    }
  }

  saveMateria() {
    console.log(this.newMateria)
    this.newMateria.camposVal = true;
    if (this.newMateria.nome && this.newMateria.descricao) {
      this.materiaService.create(this.newMateria.nome, this.newMateria.descricao).subscribe(
        () => {
          document.getElementById("closeModal_criarMat").click();
          this.alertSucess("materia", "create");
          this.userMaterias = [];
          this.refresh();
        },
        (err) => {
          this.alertError(err)
        }
      );
    } else {
      this.newMateria.camposVal = false;
    }
  }

  editMateria() {
    this.materiaToEdit.camposVal = true;
    console.log(this.materiaToEdit);

    if (this.materiaToEdit.nomeMateria && this.materiaToEdit.descricao) {
      this.materiaService.update(this.materiaToEdit.idMateria, this.materiaToEdit.nomeMateria, this.materiaToEdit.descricao).subscribe(
        () => {
          this.alertSucess("materia", "update");
        },
        (err) => {
          this.alertError(err);
        }
      );
    } else {
      this.materiaToEdit.camposVal = false;
    }
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
            this.userMaterias = [];
            this.refresh()
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
    idMateria: null,
    tipoNota: null,
    data: null,
    nota: null,
  }

  //VERIFICADORES
  notaValida = true;
  dataValida = true;
  camposValidos = true;

  saveNota() {
    this.notaValida = true;
    this.dataValida = true;
    this.camposValidos = true;

    //Campos preenchidos:
    if (this.newNota.tipoNota && this.newNota.nota != null && this.newNota.data) {
      //Campos Válidos:
      if (
        (this.newNota.nota >= 0 && this.newNota.nota <= 10) &&
        (new Date(this.newNota.data) <= new Date())
      ) {
        this.notaMateriaService.create(this.newNota.idMateria, this.newNota.nota, this.newNota.tipoNota, this.newNota.data + "T00:00:00").subscribe(
          () => {
            this.newNota = {}
            document.getElementById("close_createNota").click();
            this.alertSucess("nota", "create");
            this.userMaterias = [];
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

  /* MATERIAIS */

  arquivos: Set<File>;
  getFiles(event){
    console.log(event);

    const selecionados = <FileList> event.srcElement.files;

    let label = []
    this.arquivos = new Set();
    for(let s=0; s<selecionados.length;s++){
      label.push(selecionados[s].name);
      this.arquivos.add(selecionados[s])
    }
    document.getElementById("customFileLabel").innerHTML = label.join("; ");
  }

  uploadFiles(){
    let mat;
    this.materias.forEach((materia)=>{
      console.log(materia.idMateria)
      if(this.newNota.idMateria === materia.idMateria){
        mat = materia.descricao;
        return;
      }
    })
    if (this.arquivos && this.arquivos.size>0){
      this.materiaService.newMaterial(mat, this.arquivos).subscribe(
        () => {
          this.alertSucess("material", "create");
          this.userMaterias = [];
          this.refresh()
        },
        err => {
          this.alertError(err)
        }
      );
    }
  }



  /* FUNÇÕES AUXILIARES */
  dbMaterias: Materia[];
  userMaterias: any = {};
  refresh() {
    this.loaded = false;
    this.usuarioService.getAllInfosById().subscribe(
      (stringData: string) => {
        let data = JSON.parse(stringData)
        data = data[0]
        //Matérias do Usuario
        this.materias = data.materias;
        this.materias.forEach((m, i) => {
          if (this.userMaterias[m.nomeMateria]) {
            this.userMaterias[m.nomeMateria].descs.push({
              idMateria: m.idMateria,
              desc: m.descricao
            })
          } else {
            this.userMaterias[m.nomeMateria] = {
              id: i,
              idUsuario: m.idUsuario,
              descs: [{
                idMateria: m.idMateria,
                desc: m.descricao
              }]
            }
          }
        })
        this.materias.sort((a, b) => (a.nomeMateria.toLowerCase() > b.nomeMateria.toLowerCase()) ? 1 : -1)
        this.notas = data.notasMateria;
        this.notas.sort((a, b) => (a.notaMateria > b.notaMateria) ? 1 : -1)
        this.dataSource = new MatTableDataSource(this.notas);
        this.dataSource.paginator = this.paginator;
        this.loaded = true;
      }
    )
    //Materias do BD
    this.materiaService.getAll().subscribe(
      (stringData: string) => {
        let data = JSON.parse(stringData)
        this.dbMaterias = data;
        this.dbMaterias = this.dbMaterias.filter(mat => mat.descricao)
        let dbmateriasUnicas = this.dbMaterias.reduce(
          (arr, mat) => {
            if (arr.indexOf(mat.nomeMateria) == -1) {
              arr.push(mat.nomeMateria)
            }
            return arr;
          }
          , [])
        this.dbMaterias = this.dbMaterias.concat(
          dbmateriasUnicas.map((mat) => {
            return {
              idMateria: null,
              idUsuario: null,
              nomeMateria: mat,
              tempo: null,
              media: null,
              descricao: null,
            };
          })
        )
        this.dbMaterias.sort((a, b) => (a.nomeMateria.toLowerCase() > b.nomeMateria.toLowerCase()) ? 1 : -1)
      }
    )
  }

  dateToString(date: Date) {
    return `
    ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getFullYear()}`;    
  }

  openCreateNota() {
    document.getElementById("btn_createNota").click()
  }

  length = undefined;
  setTable(idMateria) {
    this.setEditMateria(idMateria);
    if (idMateria) {
      this.newNota.idMateria = idMateria;
      this.dataSource.data = this.notas.reduce((a, v) => {
        if (v.idMateria === idMateria) {
          a.push({ idNotaMateria: v.idNotaMateria, Nota: v.notaMateria, Tipo: v.tipoNota, Data: v.dataNota ? this.dateToString(new Date(v.dataNota)) : this.dateToString(new Date()) })
        }
        return a
      }, [])
      this.length = this.dataSource.data.length;

    } else {
      this.length = undefined;
      let links = document.getElementsByClassName("link_materias");
      for (var i = 0; i < links.length; i++) {
        if (links[i].classList.contains("active"))
          links[i].classList.remove("active");
      }
      this.materiaToEdit = {
        nomeMateria: null,
        descricao: null,
        idMateria: null
      };
    }
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
        this.notaToEdit = nota
        let date = new Date(nota.dataNota)
        this.notaToEdit.dataNota = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
      }
    })
  }

  materiaToEdit: any = {
    nomeMateria: null,
    descricao: null,
    idMateria: null
  };
  setEditMateria(idMateria) {
    console.log(idMateria)
    this.materias.forEach((materia) => {
      if (materia.idMateria === idMateria) {
        this.materiaToEdit = materia;
        this.materiaToEdit.camposVal = true;
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
      case "material":
        portTitle = 'Material'
        engTitle = 'File'
        break;
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