import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html'
})
export class RegistrarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  confPass: string;
  emailOk: boolean = true;
  passOk: boolean = true;
  formOk: boolean = true;
  form: any = {
    nome: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  ngOnInit() {
    document.getElementById("body").classList.add("bg-gradient-primary");
  }

  onSubmit({ email, password, nome }): void {
    this.loginService.register(email, password, nome).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        alert("Cadastro realizado com sucesso!")
        window.location.href = "../login"
      },
      err => {
        alert("Cadastro não realizado!")
        window.location.href = "../registrar"
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  passOK(password) {
    if (password === this.confPass) {
      this.passOk = true;
      return true;
    } else {
      this.passOk = false;
      return false;
    }
  }

  emailOK(email) {
    if (email.search("@") != -1 &&
      email.search(".com") != -1) {
      this.emailOk = true;
      return true;
    } else {
      this.emailOk = false;
      return false;
    }
  }

  formOK(): void {
    const { email, password, nome } = this.form;
    if (!email || !password || !nome) {
      this.formOk = false;
      this.passOk = false;
      this.emailOk = false;
    } else {
      this.formOk = true;
      this.passOk = true;
      this.emailOk = true;
      if (this.emailOK(email) && this.passOK(password))
        this.onSubmit(this.form);
    }
  }
}