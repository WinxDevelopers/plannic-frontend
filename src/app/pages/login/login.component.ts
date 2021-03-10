import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
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
  redirectTo: string = '';
  roles: string[] = [];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  senhaFormControl = new FormControl('', [
    Validators.required
  ]);

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

  onSubmit(): void {
    const { email, password } = this.form;
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
      },
      err => {
        this.errorMessage = err.error.message;
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
  
  isNull(){    
    if(this.form.email==null && this.form.senha==null)
      return true
    else
      return false
  }
}