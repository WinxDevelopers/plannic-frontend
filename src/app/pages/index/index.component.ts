import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, AfterViewInit {
  public isPortugues:boolean = true;
  public lang;
  public isLogged:boolean;

  constructor(
    private router: Router
  ) {
    this.lang = localStorage.getItem('lang') || 'pt-BR';
   }

  ngAfterViewInit(): void {    
    document.getElementById("body").classList.remove("pag_login");
    document.getElementById("body").classList.add("pag_inicial");
    if(window.innerWidth<=520){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    document.getElementById("body").classList.remove("pag_login");
    document.getElementById("body").classList.add("pag_inicial");
    localStorage.setItem("lang", "pt-BR");
    if (!localStorage.getItem('token')) {
      this.isLogged = false;
      this.router.navigate(['../']);
    }else{
      this.isLogged = true;
      this.router.navigate(['dashboard/calendario']);          
    }
  }

}