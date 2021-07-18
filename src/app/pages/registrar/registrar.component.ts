import { Component, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html'
})
export class RegistrarComponent implements AfterViewInit {

  constructor(
    public translate: TranslateService,
    private loginService: LoginService,
    private router: Router,) { }

  confPass: string = null;
  form: any = {
    nome: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;

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

  ngAfterViewInit() {
    document.getElementById("body").classList.remove("pag_inicial");
    document.getElementById("body").classList.add("pag_login");
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard/calendario']);
    }
  }

  loading: boolean = false;
  onSubmit(): void {
    let { email, password, nome } = this.form;
    this.loading = true;
    if (this.verify(email, password, nome)) {
      this.loginService.register(email, password, nome).subscribe(
        () => {
          this.loading = false;
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.Toast.fire({
            title: 'Cadastro realizado com sucesso!',
            icon: 'success'
          })
          this.router.navigate(['/email']);
        },
        err => {
          this.loading = false;
          switch (err.status) {
            case 500:
              if (localStorage.getItem("lang") != "en") {
                this.Toast.fire({
                  icon: 'error',
                  title: 'E-mail ja cadastrado'
                })
              } else {
                this.Toast.fire({
                  icon: 'error',
                  title: 'E-mail already registered'
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
        }
      );
    }
  }

  camposVal: boolean = true;
  emailVal: boolean = true;
  senhaMin: boolean = true;
  senhaVal: boolean = true;
  verify(email, password, nome) {
    this.camposVal = true;
    this.emailVal = true;
    this.senhaMin = true;
    this.senhaVal = true;

    let emailFormControl = new FormControl(email, [
      Validators.required,
      Validators.email,
    ]);
    let nomeFormControl = new FormControl(nome, [
      Validators.required
    ]);
    let senhaFormControl = new FormControl(password, [
      Validators.required,
    ]);

    if (emailFormControl.hasError('required') ||
      nomeFormControl.hasError('required') ||
      senhaFormControl.hasError('required') ||
      !this.confPass) {
      this.camposVal = false;
      this.loading = false;
      return;
    }
    if (!this.passMin()) {
      this.senhaMin = false;
    }
    if (password != this.confPass) {
      this.senhaVal = false
    }

    if (emailFormControl.hasError("email")) {
      this.emailVal = false;
    }

    this.loading = false;
    if (this.camposVal &&
      this.senhaMin &&
      this.senhaVal &&
      this.emailVal
    ) {
      return true;
    } else {
      return false;
    }
  }

  passMin() {
    let password = this.form.password;
    let letrasMaiusculas = /[A-Z]/;
    let letrasMinusculas = /[a-z]/;
    let numeros = /[0-9]/;
    let caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_|.]/;
    if (password.length >= 8 &&
      letrasMaiusculas.test(password) &&
      letrasMinusculas.test(password) &&
      numeros.test(password) &&
      caracteresEspeciais.test(password)) {
      return true;
    } else {
      return false;
    }
  }
}