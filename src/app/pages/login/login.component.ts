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
  roles: string[] = [];
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private authService: LoginService, 
              private tokenStorage: TokenStorageService, 
              private router: Router,
              private route:ActivatedRoute) { }
  email: String;
  senha: String;

  ngOnInit(): void {
    document.getElementById("body").classList.add("bg-gradient-primary");
    this.route.queryParams.subscribe((params:Params) => {
      this.redirectTo = params.redirectTo || '/dashboard';
    });
  }

  redirect() {
    this.router.navigate([this.redirectTo]);
  }

  onSubmit(email, password): void {
    this.authService.login(email, password).subscribe(
      data => {
        console.log(data)
        this.tokenStorage.setItem('token', data);
        this.tokenStorage.setItem('user', data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.tokenStorage.getItem('user').roles;
        this.router.navigate(['/dashboard']);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
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