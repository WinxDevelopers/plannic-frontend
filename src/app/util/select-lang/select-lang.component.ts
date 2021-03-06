import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'select-lang',
  templateUrl: './select-lang.component.html'
})
export class SelectLangComponent implements OnInit {

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('pt-BR');
    translate.addLangs(['pt-BR', 'en']);
    this.translate.use(localStorage.getItem('lang') || 'pt-BR');
  }

  ngOnInit() {
  }

  switchLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

}
