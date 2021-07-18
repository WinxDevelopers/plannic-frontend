import { AgendamentoService } from './../../../service/agendamento.service';
import { NotaMateria } from './../../../interface/notaMateria';
import { UserService } from './../../../service/user.service';
import { MateriaService } from './../../../service/materia.service';
import { AfterViewInit, Component } from '@angular/core';
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
  displayedColumns: string[] = ['nota', 'tipo', 'data', ' '];
  dataSource: MatTableDataSource<NotaMateria>;
  expandedElement: NotaMateria | null;

  ngAfterViewInit() {
    this.refresh();
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
    private agendamentoService: AgendamentoService,
    private notaMateriaService: NotaMateriaService) {
  }

  lang = localStorage.getItem("lang")
  loaded: boolean = false;
  materias: Materia[] = [];
  materiais: any[] = [];
  notas: NotaMateria[] = [];
  tipos = ["Trabalho em Grupo", "Trabalho Individual", "Prova", "Atividade"];
  idUsuario = parseInt(localStorage.getItem('idUsuario'));

  /* SUGESTÃO DE MATÉRIA */
  createSugestao(sugestao) {
    this.materiaService.createSugestao(sugestao).subscribe(
      () => {
        this.Toast.fire({
          icon: 'info',
          title: localStorage.getItem("lang") === "pt-BR" ? 'Enviado para análise' : "Sent to analyze"
        })
        document.getElementById("closeModal_criarMat").click();
        this.userMaterias = [];
        this.refresh();
      },
      err => {
        this.alertError(err)
      }
    );
  }

  /* CRUD Matéria */
  newMateria: any = {
    nome: null,
    camposVal: true,
  };

  onChange(event, type) {
    if (event) {
      if (type === "create") {
        this.newMateria.nome = event.nomeMateria;
      } else {
        this.materiaToEdit.nome = event.nomeMateria;
        this.materiaToEdit.idMateriaBase = event.idMateriaBase;
      }
    }
  }

  saveMateria() {
    this.newMateria.camposVal = true;
    let idMateriaBase;
    this.dbMaterias.forEach((materia) => {
      if (materia.nomeMateria === this.newMateria.nome) {
        idMateriaBase = materia.idMateriaBase
      }
    })
    if (this.newMateria.nome) {
      this.materiaService.create(idMateriaBase, this.newMateria.nome, this.newMateria.nome).subscribe(
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

  materiaToEdit: any = {
    nomeMateria: null,
    idMateria: null
  };
  setEditMateria(idMateria) {
    this.materias.forEach((materia) => {
      if (materia.idMateria == idMateria) {
        this.materiaToEdit = materia;
        this.materiaToEdit.camposVal = true;
        return;
      }
    })
  }

  editMateria() {
    this.materiaToEdit.camposVal = true;
    if (this.materiaToEdit.nomeMateria) {
      this.materiaService.update(this.materiaToEdit.idMateria, this.materiaToEdit.idMateriaBase, this.materiaToEdit.nomeMateria, this.materiaToEdit.nomeMateria).subscribe(
        () => {
          this.alertSucess("materia", "update");
          document.getElementById('closeModal_editMat').click();
          this.refresh();
        },
        (err) => {
          this.alertError(err);
        }
      );
    } else {
      this.materiaToEdit.camposVal = false;
    }
  }

  delMateria(idMateria) {
    this.confDel().then((result) => {
      if (result.isConfirmed) {
        this.notas.forEach((nota) => {
          if (nota.idMateria === idMateria) {
            this.delNota(nota.idNotaMateria, true)
          }
        })
        this.materiais.forEach((material) => {
          if (material.idMateria = idMateria) {
            this.deleteMaterial(material.idMaterial, true);
          }
        })
        this.agendamentoService.getAll().subscribe(
          (data) => {
            data = JSON.parse(data)
            data = data.filter(ag => { ag.idUsuario === this.idUsuario })
            data.forEach(ag => {
              if (ag.idMateria === idMateria) {
                this.agendamentoService.delete(ag.idAgendamento)
              }
            });
          },
          err => { console.log(err) }
        )
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

  idMateria: string;
  //Definir materia que vai ser associada a nota nova
  setIdMateria(idMateria) {
    console.log(idMateria)
    this.idMateria = idMateria
  }
  saveNota() {
    this.notaValida = true;
    this.dataValida = true;
    this.camposValidos = true;
    this.newNota.idMateria = parseInt(this.idMateria);

    //Campos preenchidos:
    if (this.newNota.tipoNota && this.newNota.nota != null && this.newNota.data) {
      //Campos Válidos:
      if (
        (this.newNota.nota >= 0 && this.newNota.nota <= 10) &&
        (new Date(this.newNota.data) <= new Date())
      ) {
        this.notaMateriaService.create(this.newNota.idMateria, this.newNota.nota, this.newNota.tipoNota, this.newNota.data + "T00:00:00").subscribe(
          () => {
            this.alertSucess("nota", "create");
            document.getElementById("closeModal_createNota").click();
            this.newNota = {}
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
        this.notaToEdit = JSON.parse(JSON.stringify(nota))
        let date = new Date(nota.dataNota)
        this.notaToEdit.dataNota = `${date.getFullYear()}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`
      }
    })
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
            this.refresh();
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
              this.alertSucess("nota", "delete");
              this.refresh()
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
  currentMateria: any;
  arquivos: File[] = [];
  displayedColumnsMateriais: string[] = ["nome", " "]
  getFiles(event, idMateria) {
    this.currentMateria = idMateria;

    const selecionados = <FileList>event.srcElement.files;

    let label = []
    this.arquivos;
    for (let s = 0; s < selecionados.length; s++) {
      label.push(selecionados[s].name);
      this.arquivos.push(selecionados[s])
    }
    document.getElementById(`customFileLabel_${idMateria}`).innerHTML = label.join("; ");
  }

  uploadFiles() {
    this.arquivos.forEach(file => {
      var name = file.name;
      var type = file.type;
      var publico = false;
      console.log(name)
      console.log(type)

      this.readFile(file).then((result) => {
        var material = result;
        let idMat;

        Object.keys(this.userMaterias).forEach((id) => {
          if (this.currentMateria === id) {
            idMat = parseInt(id);
            return;
          }
        })
        if (this.arquivos && this.arquivos.length > 0) {
          this.materiaService.newMaterial(idMat, material, name, type, publico).subscribe(
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
      })
    })
  }

  editMaterial(material) {
    this.materiaService.updateMaterial(material.idMaterial, material.idMateria, material.material, material.nomeMaterial, material.tipoMaterial, !material.publico).subscribe(
      () => { material.publico = !material.publico },
      err => { this.alertError(err) })
  }

  deleteMaterial(idMaterial, fromDeleteMateria) {
    if (fromDeleteMateria) {
      this.materiaService.deleteMaterial(idMaterial).subscribe()
    } else {
      this.confDel().then((result) => {
        if (result.isConfirmed) {
          this.materiaService.deleteMaterial(idMaterial).subscribe(
            () => { this.alertSucess("material", "delete") },
            err => { this.alertError(err) })
        }
      })
    }
  }

  materiaisPorMateria(idMateriaBase) {
    this.materiaService.getAllMaterialPublico(idMateriaBase).subscribe(
      (materiais) => {
        console.log(materiais)
      },
      err => { this.alertError(err) }
    )
  }

  downloadFile(material) {
    console.log(material)
    var file = this.dataURLtoFile(material.material, material.nomeMaterial)

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;

    link.download = material.nomeMaterial;

    link.click();

    window.URL.revokeObjectURL(blob);
    link.remove();
  }

  materiaisPublicos: any[] = [];
  searchinPublicos = false;
  setPesquisa(idMateria) {
    this.materiaisPublicos = []
    this.searchinPublicos = true;
    this.materiaService.getAllMaterialPublico(idMateria).subscribe(
      (data) => {
        if (data.length > 0) {
          this.materiaisPublicos = JSON.parse(data);
          this.materiaisPublicos.sort((a, b) => { return a.nomeMaterial.localeCompare(b.nomeMaterial) })
        }
        this.searchinPublicos = false;
      },
      err => this.alertError(err)
    )
  }

  /* FUNÇÕES AUXILIARES */
  dbMaterias: any[];
  userMaterias: any[] = [];
  dataURL: any;
  filename: any;
  refresh() {
    this.loaded = false;
    this.usuarioService.getAllInfosById().subscribe(
      (stringData: string) => {
        let data = JSON.parse(stringData)
        data = data[0]

        //Notas do Usuário
        data.notasMateria.forEach(nota => {
          nota.dataNota = this.dateToString(new Date(nota.dataNota))
        });
        this.notas = data.notasMateria;
        this.notas.sort((a, b) => (a.notaMateria > b.notaMateria) ? 1 : -1)

        //Materiais do Usuário
        this.materiaService.getAllMaterial().subscribe(
          (materiaisData) => {
            this.userMaterias = [];
            this.materiais = JSON.parse(materiaisData)
            //Matérias do Usuario
            this.materias = data.materias.sort((a, b) => { return a.nomeMateria.localeCompare(b.nomeMateria) });
            this.materias.forEach((m) => {
              this.userMaterias.push({
                id: m.idMateria,
                nome: m.nomeMateria,
                notas: data.notasMateria.filter(nota => m.idMateria === nota.idMateria),
                materiais: this.materiais.filter(material => m.idMateria === material.idMateria),
                idMateriaBase: m.idMateriaBase
              })
            })
            //Materias do BD
            this.materiaService.getAllBase().subscribe(
              (stringData: string) => {
                let data = JSON.parse(stringData)
                for (let matUser of this.materias) {
                  if (matUser.idMateriaBase != 0) {
                    for (let i=0;i<data.length; i++) {
                      if(data[i].idMateriaBase === matUser.idMateriaBase){
                        data.splice(i, 1);
                      }
                    }
                  }
                }
                this.dbMaterias = data
                  .map(mat => { return { idMateriaBase: mat.idMateriaBase, nomeMateria: mat.materiaBase } })
                  .sort((a, b) => { return a.nomeMateria.localeCompare(b.nomeMateria) })
                this.loaded = true;
              }
            )
          },
          err => console.log(err)
        )
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

  readFile(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onerror = reject;
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result)
      };
    });
  }

  dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}