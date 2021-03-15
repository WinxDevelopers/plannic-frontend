import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dash-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  public nome: string = "sdibds";

  constructor(
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.nome = localStorage.getItem('nome')
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['../']);
  }
}
