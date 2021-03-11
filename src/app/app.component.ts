import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.prod';

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
    ){
      this.translate.addLangs(['pt-BR', 'en']);
      this.translate.setDefaultLang('pt-BR');
      this.translate.use(localStorage.getItem('lang') || 'pt-BR');
  }

  ngOnInit() { 
    document.getElementById("body").classList.remove("pag_login");
    document.getElementById("body").classList.add("pag_inicial");
    if (window.location.hostname != "localhost") {
      if (window.location.protocol === 'http:') {
        window.location.href = window.location.href.replace('http', 'https');
      }
    }
  }

  switchLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}
