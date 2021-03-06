import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  dadosLogin;
  errorMessage = '';
  emailOk: boolean = true;
  formOk: boolean = true;
  redirectTo: string = '';
  roles: string[] = [];
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private authService: LoginService,
    private router: Router,
    private route: ActivatedRoute) { }
  email: String;
  senha: String;

  ngOnInit(): void {
    document.getElementById("body").classList.remove("pag_inicial");
    document.getElementById("body").classList.add("bg-gradient-primary");
    this.route.queryParams.subscribe((params: Params) => {
      this.redirectTo = params.redirectTo || '/dashboard';
    });
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard/calendario']);
    }
  }

  redirect() {
    this.router.navigate([this.redirectTo]);
  }

  onSubmit(email, password): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    this.authService.login(email, password).subscribe(
      data => {
        this.dadosLogin = JSON.parse(data);
        localStorage.setItem('idUsuario', this.dadosLogin.idUsuario)
        localStorage.setItem('nome', this.dadosLogin.nome)
        localStorage.setItem('token', this.dadosLogin.token)
        this.router.navigate(['/dashboard/']);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        if (localStorage.getItem("lang") != "en") {
          Toast.fire({
            icon: 'error',
            title: 'Ocorreu um erro'
          })
        } else {
          Toast.fire({
            icon: 'error',
            title: 'An error has occurred'
          })
        }
      }
    );
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
    const { email, password } = this.form;
    if (!email || !password) {
      this.formOk = false;
      this.emailOk = false;
    } else {
      this.formOk = true;
      this.emailOk = true;
      if (this.emailOK(email))
        this.onSubmit(email, password);
    }
  }
}