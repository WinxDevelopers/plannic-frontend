import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token.storage.service';

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
