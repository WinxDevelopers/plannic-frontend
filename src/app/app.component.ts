import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'plannic';
  public isLogged: boolean = false;
  public redirectTo:string = '';

  constructor(
    public translate: TranslateService,
    private location: Location,
    ){
      this.translate.addLangs(['pt-BR', 'en']);
      this.translate.setDefaultLang('pt-BR');
      this.translate.use(localStorage.getItem('lang') || 'pt-BR');
  }

  ngOnInit() {  
  }

  switchLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}
