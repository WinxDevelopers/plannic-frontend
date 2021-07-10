import { AgendamentoService } from 'src/app/service/agendamento.service';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MateriaService } from 'src/app/service/materia.service';
import { NotaMateriaService } from 'src/app/service/notaMateria.service';
import { FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements OnInit {

  constructor(
    public userService: UserService,
    public agService: AgendamentoService,
    public matService: MateriaService,
    public notaService: NotaMateriaService,
    private router: Router
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
  userInfos;

  email: string;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nome: string;
  senha: string = '';
  senhaConf: string = '';
  passMinOk = true;
  telegramInicial;
  notificacao = {
    active: null,
    numero: null
  }


  auth() {
    var width = 550;
    var height = 470;
    var left = Math.max(0, (screen.width - width) / 2),
      top = Math.max(0, (screen.height - height) / 2);
    let telegramPage = window.open('https://oauth.tg.dev/auth?bot_id=1837445567&origin=https%3A%2F%2Fplannic.herokuapp.com&embed=1&request_access=write', 'telegram_oauth', 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',status=0,location=0,menubar=0,toolbar=0');
    let timer = setInterval(() => {
      if (telegramPage.closed) {
        this.verifyTelegramObg()
        clearInterval(timer);
      }
    }, 500);
  }

  verifyTelegramObg() {
    this.userService.telegramObj().subscribe(
      (objFinal: any) => {
        let chatId = objFinal.result[objFinal.result.length-1].message.chat.id;
        this.userService.addTelegramID(chatId.toString()).subscribe(
          (data)=>{

          }
        )
      }
    )
  }

  ngOnInit() {
    this.userService.getAllInfosById().subscribe(
      (data: any) => {
        data = JSON.parse(data);
        this.userInfos = data[0];
        this.email = this.userInfos.email;
        this.nome = this.userInfos.nome;
        this.userService.getTelegramID().subscribe(
          (obj: any) => {
            this.telegramInicial = obj === "" ? null : JSON.parse(obj).idTelegram;
          }
        )
      },
      err => {
        this.alertError(err);
      }
    )
  }

  alterarSenha() {
    this.userService.changePass(this.senha).subscribe(
      () => {
        this.alertSucess("pass", "update");
      },
      err => { this.alertError(err) }
    );
  }

  alterarInfos() {
    this.userService.edit(this.nome, this.email, JSON.stringify(this.notificacao)).subscribe(
      () => { this.alertSucess("user", "update") },
      err => { this.alertError(err); }
    );
  }

  deleteUser() {
    this.userInfos.agendamentos.forEach(async ag => {
      await this.agService.delete(ag.idAgendamento).toPromise()
    });
    this.userInfos.notasMateria.forEach(async nota => {
      await this.notaService.delete(nota.idNotaMateria).toPromise()
    });
    this.userInfos.materias.forEach(async mat => {
      await this.matService.delete(mat.idMateria).toPromise()
    });
    this.userService.delete().subscribe(
      () => {
        this.alertSucess("user", "delete");
        localStorage.clear();
        this.router.navigate(['../../']);
      },
      err => { this.alertError(err); }
    );
  }

  /* FUNÇÕES AUXILIARES */

  changeTab(type) {
    switch (type) {
      case "infos":
        document.getElementById("edit-infos-tab").click()
        break;
      case "senha":
        document.getElementById("senha-tab").click()
        break;
      case "excluir":
        document.getElementById("delete-account-tab").click()
        break;
      default:
        break;
    }
  }

  passMin() {
    if (this.senha === '') return true;
    let letrasMaiusculas = /[A-Z]/;
    let letrasMinusculas = /[a-z]/;
    let numeros = /[0-9]/;
    let caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_|.]/;
    if (this.senha.length >= 8 &&
      letrasMaiusculas.test(this.senha) &&
      letrasMinusculas.test(this.senha) &&
      numeros.test(this.senha) &&
      caracteresEspeciais.test(this.senha)) {
      this.passMinOk = true;
      return true;
    } else {
      this.passMinOk = false;
      return false;
    }
  }

  alertSucess(obj, crud) {
    let portTitle;
    let engTitle;
    switch (obj) {
      case "user":
        portTitle = 'Usuário';
        engTitle = 'User';
        break;
      case "pass":
        portTitle = 'Senha';
        engTitle = 'Password';
        break;
    }

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
