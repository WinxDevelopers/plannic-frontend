import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TokenStorageService } from 'src/app/service/token.storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  emailOk: boolean = true;
  formOk: boolean = true;
  roles: string[] = [];

  constructor(private authService: LoginService, private tokenStorage: TokenStorageService, private router: Router) { }
  email: String;
  senha: String;

  ngOnInit(): void {
    document.getElementById("body").classList.add("bg-gradient-primary");

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
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

  onSubmit(email, password) {
    this.authService.login(email, password)
      .then(token => {
          console.log(token);
          this.tokenStorage.saveToken(token);          
          //this.tokenStorage.saveUser(data);  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['/dashboard']);
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

  reloadPage(): void {
    window.location.reload();
  }
}