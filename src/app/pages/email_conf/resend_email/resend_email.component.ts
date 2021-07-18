import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'resend_email',
  templateUrl: './resend_email.component.html',
  styleUrls: ['./resend_email.component.scss']

})
export class Resend_emailComponent implements OnInit, AfterViewInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

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

  email: string;
  progress = 0;
  ngAfterViewInit(): void {
    window.setInterval(() => {
      this.progress = this.progress + 1;
    }, 150);
  }

  async sendNewEmail() {
    let title;
    if (localStorage.getItem('lang') != "en") {
      title = "Digite seu e-mail";
    } else {
      title = "Type your e-mail";
    }
    const { value: email } = await Swal.fire({
      title,
      input: 'text',
      inputValue: this.email,
      inputValidator: (value) => {
        let emailControl = new FormControl(value, [
          Validators.email
        ]);
        if (localStorage.getItem('lang') != "en") {
          if (!value) {
            return 'Preencha o campo'
          }
          if (emailControl.invalid) {
            return 'E-mail inválido'
          }
        } else {
          if (!value) {
            return 'Fill in the field'
          }
          if (emailControl.invalid) {
            return 'Invalid e-mail'
          }
        }
      }
    })
    if (email) {
      this.loginService.sendNewEmail(email).subscribe(
        () => {
          if (localStorage.getItem("lang") != "en") {
            this.Toast.fire({
              icon: 'success',
              title: 'E-mail enviado'
            })
          } else {
            this.Toast.fire({
              icon: 'success',
              title: 'E-mail sent'
            })
          }
          this.progress = 0;
        },
        err => {
          switch (err.status) {
            case 500:
              if (localStorage.getItem("lang") != "en") {
                this.Toast.fire({
                  icon: 'error',
                  title: 'Usuário não cadastrado'
                })
              } else {
                this.Toast.fire({
                  icon: 'error',
                  title: 'User not registered'
                })
              }
              break;
            case 204:
              if (localStorage.getItem("lang") != "en") {
                this.Toast.fire({
                  icon: 'error',
                  title: 'Usuário já verificado'
                })
              } else {
                this.Toast.fire({
                  icon: 'error',
                  title: 'User has already been verified'
                })
              }
              break;
            default:
              if (localStorage.getItem("lang") != "en") {
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
              break;
          }

          this.progress = 0;
        })
    }
  }

}
