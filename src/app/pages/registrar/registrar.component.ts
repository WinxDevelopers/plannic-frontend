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
  emailOk: boolean = true;
  passOk: boolean = true;
  passMinOk: boolean = true;
  passConfOk: boolean = true;
  formOk: boolean = true;
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
    timer: 3000,
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

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nomeFormControl = new FormControl('', [
    Validators.required
  ]);
  senhaFormControl = new FormControl('', [
    Validators.required
  ]);
  confSenhaFormControl = new FormControl('', [
    Validators.required
  ]);

  onSubmit(): void {
    let { email, password, nome } = this.form;
    this.loginService.register(email, password, nome).subscribe(
      () => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.Toast.fire({
          title: 'Cadastro realizado com sucesso!',
          icon: 'success'})
          this.router.navigate(['/email']);
      },
      err => {
        this.Toast.fire({
          title: 'Cadastro não realizado!',
          icon: 'error'
        })
      }
    );
  }

  switchLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  passMin() {
    if (this.form.password === null || this.isNull() === true) return true;
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
      this.passMinOk = true;
      return true;
    } else {
      this.passMinOk = false;
      return false;
    }
  }

  camposOk() {
    if (this.isNull()) return true;
    if (this.emailFormControl.hasError('required')) return false
    if (this.nomeFormControl.hasError('required')) return false
    if (this.senhaFormControl.hasError('required')) return false
    if (this.confSenhaFormControl.hasError('required')) return false
    return true;
  }
  isNull() {
    if (
      this.form.nome == null &&
      this.form.email == null &&
      this.form.password == null &&
      this.confPass == null
    ) {
      return true
    } else {
      return false
    }
  }
}