import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TokenStorageService } from 'src/app/service/token.storage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

const USER_TOKEN = 'token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };

  errorMessage = '';
  emailOk: boolean = true;
  formOk: boolean = true;
  redirectTo:string = '';

  constructor(private authService: LoginService, 
              private tokenStorage: TokenStorageService, 
              private router: Router,
              private route:ActivatedRoute) { }
  email: String;
  senha: String;

  ngOnInit(): void {
    document.getElementById("body").classList.add("bg-gradient-primary");
    this.tokenStorage.getItem(USER_TOKEN)
      .subscribe((token) => {
        if (token) {
          this.router.navigate(['/dashboard']);
        }
      });
    this.route.queryParams.subscribe((params:Params) => {
      this.redirectTo = params.redirectTo || '/dashboard';
    });
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

  redirect() {
    this.router.navigate([this.redirectTo]);
  }

  onSubmit(email, password) {
    this.authService.login(email, password)
      .then(token => {
          this.tokenStorage.setItem(USER_TOKEN, token).subscribe(() => {
            window.location.reload();
            this.redirect();
            //CORRIGIR REDIRECT
          });
        })
      .catch(e => {
        alert("Login não realizado");
        console.log(e);
      });
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