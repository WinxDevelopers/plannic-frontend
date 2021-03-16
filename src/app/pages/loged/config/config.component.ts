import { AgendamentoService } from 'src/app/service/agendamento.service';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MateriaService } from 'src/app/service/materia.service';
import { NotaMateriaService } from 'src/app/service/notaMateria.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements OnInit, AfterViewInit {

  constructor(
    public userService: UserService,
    public agService: AgendamentoService,
    public matService: MateriaService,
    public notaService: NotaMateriaService
  ) { }

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

  email: string;
  nome: string;
  userInfos;

  ngAfterViewInit(): void {

    this.userService.getAllById().subscribe(
      (data: any) => {
        data = JSON.parse(data);
        this.userInfos = data[0];
        this.email = this.userInfos.email;
        this.nome = this.userInfos.nome;
      },
      err => {

      }
    )
  }

  ngOnInit() {
  }

  deleteUser() {
    this.confDel().then((result) => {
      if (result.isConfirmed) {
        this.userInfos.agendamentos.forEach(async ag => {
            await this.agService.delete(ag.idAgendamento)
        });
        this.userInfos.notasMateria.forEach(async nota => {
          await this.notaService.delete(nota.idNotaMateria)
        });
        this.userInfos.materias.forEach(async mat => {
          await this.matService.delete(mat.idMateria)
        });
        this.userService.deleteUser().subscribe(
          () => { this.alertSucess("delete") },
          err => { this.alertError(err); }
        );
      }
    })
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

  alertSucess(crud) {
    let portTitle;
    let engTitle;
    portTitle = 'Usuário';
    engTitle = 'User';

    switch (crud) {
      case "update":
        portTitle += " alterado"
        engTitle += " changed"
        break;
      case "delete":
        portTitle += " deletado"
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

}
