import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dash-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  public nome: string = "sdibds";

  constructor() { }

  ngOnInit() {
    this.nome = localStorage.getItem('nome')
  }

}
