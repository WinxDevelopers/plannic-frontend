import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { LoginService } from 'src/app/service/login.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import addDays from 'date-fns/addDays'
import formatISO from 'date-fns/formatISO'
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
  redirectTo: string = '';
  roles: string[] = [];

  constructor(
    private authService: LoginService,
    private router: Router,
    private route: ActivatedRoute) { }
  email: String;
  senha: String;

  ngOnInit(): void {
    if(!window.location.href.includes("verify?code")){
      document.getElementById("body").classList.remove("pag_inicial");
      document.getElementById("body").classList.add("pag_login");
      this.route.queryParams.subscribe((params: Params) => {
        this.redirectTo = params.redirectTo || '/dashboard';
      });
      if (localStorage.getItem('token')) {
        this.router.navigate(['dashboard/calendario']);
      }
    }else{
      localStorage.removeItem("idUsuario")
      localStorage.removeItem("nome")
      localStorage.removeItem("token")
    }
  }


  valEmail: boolean = true;
  valCampos: boolean = true;
  loading: boolean = false;
  onSubmit(): void {
    this.loading = true;
    this.valEmail = true;
    this.valCampos = true;
    const { email, password } = this.form;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    let emailFormControl = new FormControl(email, [
      Validators.required,
      Validators.email,
    ]);
    let senhaFormControl = new FormControl(password, [
      Validators.required
    ]);

    if (emailFormControl.valid && senhaFormControl.valid) {
      this.authService.login(email, password).subscribe(
        data => {
          this.loading = false;
          this.dadosLogin = JSON.parse(data);
          localStorage.setItem('idUsuario', this.dadosLogin.idUsuario);
          localStorage.setItem('nome', this.dadosLogin.nome);
          localStorage.setItem('token', this.dadosLogin.token);
          localStorage.setItem('time', formatISO(addDays(new Date(), 1)));
          this.router.navigate(['/dashboard/calendario']);
        },
        err => {
          this.loading = false;
          this.errorMessage = err.error.message;
          switch (err.status) {
            case 500:
              if (localStorage.getItem("lang") != "en") {
                Toast.fire({
                  icon: 'error',
                  title: 'Você digitou algo errado'
                })
              } else {
                Toast.fire({
                  icon: 'error',
                  title: 'You typed something wrong'
                })
              }
              break;
            case 401:
              if (localStorage.getItem("lang") != "en") {
                Toast.fire({
                  icon: 'info',
                  title: 'Verifique seu e-mail'
                })
              } else {
                Toast.fire({
                  icon: 'info',
                  title: 'Verify your e-mail'
                })
              }
              document.getElementById("send_email").click()
              break;

            default:
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
              break;
          }
        }
      );
    } else {
      this.loading = false;
      if (emailFormControl.hasError("required") || senhaFormControl.hasError("required")) {
        this.valCampos = false;
        return
      }
      if (emailFormControl.hasError("email")) {
        this.valEmail = false;
        return
      }
    }

  }
}