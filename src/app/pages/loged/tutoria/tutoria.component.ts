import { UserService } from 'src/app/service/user.service';
import { TutoriaService } from './../../../service/tutoria.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutoria',
  templateUrl: './tutoria.component.html',
  styleUrls: ['./tutoria.component.scss']
})
export class TutoriaComponent implements OnInit {

  /* Alert */
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  lang = localStorage.getItem("lang");
  user = {
    aluno: {
      completas: [],
      incompletas: []
    },
    tutor: {
      completas: [],
      incompletas: []
    },
    faltaAvaliar: [],
    nota: 0,
    materias: []
  }
  comunidade: any = {
    alunos: [],
    tutores: []
  }
  setTables = {
    minhas: false,
    comunidade: true,
  }
  newTutoria = {
    user: "aluno",
    materia: 0
  }
  loading = false;


  constructor(
    private tutoriaService: TutoriaService,
    private userService: UserService
  ) { }

  notaImg: string;
  ngOnInit(): void {
    this.refresh();
  }

  conectAlunoTutor(idMateriaBase, idOtherUser, createdBy) {
    console.log(idMateriaBase)
    console.log(idOtherUser)
    console.log(createdBy)
    if (createdBy === "aluno") {
      this.tutoriaService.createTutoriaByAluno(idMateriaBase, idOtherUser).subscribe(
        () => {
          this.user.materias.forEach(({ nomeMateria, idMateriaBase }) => {
            // Tutores por Materia
            this.tutoriaService.getAllTutoresByMateria(idMateriaBase).subscribe(
              (tutoresPorMateria: any) => {
                if (JSON.parse(tutoresPorMateria).length > 0) {
                  this.comunidade.tutores = JSON.parse(tutoresPorMateria).map((tutoria) => {
                    return {
                      materia: {
                        idMateriaBase,
                        nomeMateria
                      },
                      tutor: {
                        id: tutoria.idTutor,
                        nome: tutoria.idUsuarioTutor.nome,
                        nota: tutoria.nota
                      }
                    }
                  });
                }
                this.refresh()
              },
              err => { console.log(err) }
            )
          })
        },
        err => console.log(err))
    } else {
      this.tutoriaService.createTutoriaByTutor(idMateriaBase, idOtherUser).subscribe(
        () => {
          this.user.materias.forEach(({ nomeMateria, idMateriaBase }) => {
            // Alunos por Materia
            this.tutoriaService.getAllAlunosByMateria(idMateriaBase).subscribe(
              (alunosPorMateria: any) => {
                if (JSON.parse(alunosPorMateria).length > 0) {
                  this.comunidade.alunos = JSON.parse(alunosPorMateria).map((tutoria) => {
                    return {
                      materia: {
                        idMateriaBase,
                        nomeMateria
                      },
                      aluno: {
                        id: tutoria.idAluno,
                        nome: tutoria.idUsuarioAluno.nome,
                        nota: tutoria.nota
                      }
                    }
                  });
                }
                this.refresh()
              },
              err => { console.log(err) }
            )
          })
        })
    }
  }

  criarTutoria() {
    this.tutoriaService[this.newTutoria.user === "aluno" ? 'createAluno' : 'createTutor'](this.newTutoria.materia).subscribe(
      () => {
        document.getElementById("closeModalTutoria").click();
        this.alertSucess('create');
        this.refresh()
      },
      err => {
        this.alertError(err);
      })
  }

  deletarTutoria(tutoria, type) {
    this.confDel().then((result) => {
      if (result.isConfirmed) {
        if (type === "completa") { // Tutoria com tutor e aluno
          this.tutoriaService.cancelaTutoria(tutoria.idTutoria).subscribe(
            () => {
              document.getElementById("closeModalTutoria").click();
              this.alertSucess('delete');
            },
            err => {
              this.alertError(err);
            })
        } else { // Tutoria com tutor ou aluno
          this.tutoriaService[!this.setTables.minhas ? 'deleteAluno' : 'deleteTutor'](!this.setTables.minhas ? tutoria.idAluno : tutoria.idTutor).subscribe(
            () => {
              document.getElementById("closeModalTutoria").click();
              this.alertSucess('delete');
              this.refresh()
            },
            err => {
              this.alertError(err);
            })
        }
      }
    })

  }

  concluirTutoria(idTutoria) {
    console.log(idTutoria)
    this.tutoriaService.encerrarTutoria(idTutoria).subscribe(
      () => {
        this.alertSucess("conclude");
        this.refresh()
      },
      (err) => { this.alertError(err) })
  }

  refresh() {
    this.loading = true;
    /* USUARIO */
    this.userService.getAllInfosById().subscribe(
      (allInfoUser: any) => {
        //Materias do usuários
        this.user.materias = JSON.parse(allInfoUser)[0].materias
          .filter((materia) => materia.idMateriaBase != 0)
          .map((materia) => { return { nomeMateria: materia.nomeMateria, idMateriaBase: materia.idMateriaBase } })
          .sort((a, b) => { return a.nomeMateria.localeCompare(b.nomeMateria) });
        this.newTutoria.materia = this.user.materias[0]?.idMateriaBase;
        //Nota do Usuário
        this.userService.getNota().subscribe(
          (notaUser: string) => {
            this.user.nota = parseFloat(notaUser);
            //Notas pendentes
            this.userService.getAvaliacoesPendentes().subscribe(
              (notasParaAvaliar: any) => {
                this.user.faltaAvaliar = JSON.parse(notasParaAvaliar);
                //User como Aluno
                //Tutorias Completas
                this.tutoriaService.getAllUserAluno().subscribe(
                  (tutoriasComoAluno_Completa: string) => {
                    this.user.aluno.completas = (JSON.parse(tutoriasComoAluno_Completa))
                      .map(aluno => { return { idTutoria: aluno.idTutoria, nomeTutor: aluno.usuarioTutor.nome, nomeMateria: aluno.materiaBase.materiaBase } })
                      .sort((a, b) => { return a.nomeMateria.localeCompare(b.nomeMateria) });
                    //Tutorias Incompletas
                    this.tutoriaService.getSemTutorById().subscribe(
                      (tutoriasComoAluno_Incompleta) => {
                        this.user.aluno.incompletas = (JSON.parse(tutoriasComoAluno_Incompleta))
                          .map(aluno => { return { idAluno: aluno.idAluno, nomeMateria: aluno.materiaBase.materiaBase } })
                          .sort((a, b) => { return a.nomeMateria.localeCompare(b.nomeMateria) });
                        //User como Tutor
                        //Tutoras Completas
                        this.tutoriaService.getAllUserTutor().subscribe(
                          (tutoriasComoTutor_Completa: string) => {
                            this.user.tutor.completas = (JSON.parse(tutoriasComoTutor_Completa))
                              .map(tutor => { return { idTutoria: tutor.idTutoria, nomeAluno: tutor.usuarioAluno.nome, nomeMateria: tutor.materiaBase.materiaBase } })
                              .sort((a, b) => { return a.nomeMateria.localeCompare(b.nomeMateria.nome) });
                            //Tutorias Incompletas
                            this.tutoriaService.getSemAlunoById().subscribe(
                              (tutoriasComoTutor_Incompleta) => {
                                this.user.tutor.incompletas = (JSON.parse(tutoriasComoTutor_Incompleta))
                                  .map(tutor => { return { idTutor: tutor.idTutor, nomeMateria: tutor.materiaBase.materiaBase } })
                                  .sort((a, b) => { return a.nomeMateria.localeCompare(b.nomeMateria) });
                                /* COMUNIDADE */
                                this.user.materias.forEach(({ nomeMateria, idMateriaBase }, idx) => {
                                  // Alunos por Materia
                                  this.tutoriaService.getAllAlunosByMateria(idMateriaBase).subscribe(
                                    (alunosPorMateria: any) => {
                                      if (JSON.parse(alunosPorMateria).length > 0) {
                                        this.comunidade.alunos = this.comunidade.alunos.concat(...JSON.parse(alunosPorMateria).map((tutoria) => {
                                          return {
                                            materia: {
                                              idMateriaBase,
                                              nomeMateria
                                            },
                                            aluno: {
                                              id: tutoria.idUsuarioAluno.idUsuario,
                                              nome: tutoria.idUsuarioAluno.nome,
                                              nota: tutoria.nota
                                            }
                                          }
                                        }))
                                      }
                                      // Tutores por Materia
                                      this.tutoriaService.getAllTutoresByMateria(idMateriaBase).subscribe(
                                        (tutoresPorMateria: any) => {
                                          if (JSON.parse(tutoresPorMateria).length > 0) {
                                            this.comunidade.tutores = this.comunidade.tutores.concat(...JSON.parse(tutoresPorMateria).map((tutoria) => {
                                              return {
                                                materia: {
                                                  idMateriaBase,
                                                  nomeMateria
                                                },
                                                tutor: {
                                                  id: tutoria.idUsuarioTutor.idUsuario,
                                                  nome: tutoria.idUsuarioTutor.nome,
                                                  nota: tutoria.nota
                                                }
                                              }
                                            }));
                                          }
                                        },
                                        err => { console.log(err) })
                                    },
                                    err => { console.log(err) })
                                  if (idx === this.user.materias.length - 1) {
                                    this.loading = false;
                                    if (this.user.faltaAvaliar.length > 0) {
                                      document.getElementById("btn_modalNotas").click();
                                      this.darNotas()
                                    }
                                  }
                                })
                              },
                              (err) => { console.log(err) })
                          },
                          (err) => { console.log(err) })
                      },
                      (err) => { console.log(err) })
                  },
                  (err) => { console.log(err) })
              },
              (err) => { console.log(err) })
          },
          (err) => { console.log(err) })
      }
    )
  }

  notaAtual;
  idxNota = 0;
  darNotas() {
    if (this.idxNota < this.user.faltaAvaliar.length) {
      this.notaAtual = this.user.faltaAvaliar[this.idxNota];
      this.notaAtual.anterior=0;
    } else {
      document.getElementById("btn_modalNotas").click();
    }
  }
  onRate({ newValue }) {
    this.notaAtual.nota = newValue;
    console.log(this.notaAtual)
    this.userService.newAvaliacao(this.notaAtual).subscribe(
      ()=>{
        this.idxNota++;
        this.darNotas();
      },
      (err)=>{this.alertError(err)})
  }

  alertSucess(crud) {
    let portTitle = "Tutoria";
    let engTitle = "Tutoring";

    switch (crud) {
      case "create":
        portTitle += " criada"
        engTitle += " created"
        break;
      case "conclude":
        portTitle += "concluída"
        engTitle += " concluded"
        break;
      case "delete":
        portTitle += " deletada"
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
