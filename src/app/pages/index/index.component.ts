import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  public isPortugues:boolean = true;
  public lang;

  constructor(
    public translate: TranslateService
  ) {
    this.lang = localStorage.getItem('lang') || 'pt-BR';
    translate.addLangs(['pt-BR', 'en']);
   }

  ngOnInit() {
    document.getElementById("body").classList.remove("bg-gradient-primary");
  }

  switchLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}