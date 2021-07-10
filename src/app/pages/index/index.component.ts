import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
 
const tokenVerify = new JwtHelperService();

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, AfterViewInit {
  public isPortugues: boolean = true;
  public lang;
  public isLogged: boolean;

  constructor(
    private router: Router
  ) {
    this.lang = localStorage.getItem('lang') || 'pt-BR';
  }

  ngAfterViewInit(): void {
    document.getElementById("body").classList.remove("pag_login");
    document.getElementById("body").classList.add("pag_inicial");
    if (window.innerWidth <= 520) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    document.getElementById("body").classList.remove("pag_login");
    document.getElementById("body").classList.add("pag_inicial");
    if (localStorage.getItem("token")) {
      if(tokenVerify.isTokenExpired(localStorage.getItem("token"))){        
        localStorage.clear()
        this.router.navigate(['../']);
      }else{
        this.router.navigate(['dashboard/calendario']);
      }
    } else {
      localStorage.clear()
      this.router.navigate(['../']);
    }
    if (!localStorage.getItem("lang"))
      localStorage.setItem("lang", "pt-BR");
  }

}