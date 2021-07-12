import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MateriaService } from 'src/app/service/materia.service';

@Component({
  selector: 'dash-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  public nome: string;
  public isAdm = false;

  constructor(
    private userService: UserService,
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.nome = localStorage.getItem('nome')
    this.userService.userType().subscribe(
      (userInfos: string) => {
        let type = JSON.parse(userInfos)[0].idfuncao;
        if (type = 1) this.isAdm = true
      },
      (err) => console.log(err)
    )
  }



  deslogar() {
    localStorage.clear();
    this.router.navigate(['../']);
  }
}
