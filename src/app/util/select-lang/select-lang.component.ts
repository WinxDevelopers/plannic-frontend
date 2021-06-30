import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss'],
})
export class SelectLangComponent implements OnInit {

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('pt-BR');
    translate.addLangs(['pt-BR', 'en']);
    this.translate.use(localStorage.getItem('lang') || 'pt-BR');
  }

  public firstload = true;

  ngOnInit() {
    if(this.translate.currentLang==="pt-BR"){
      document.getElementById("button_switch").click();
    }else{
      this.firstload = false;
    }
  }

  switchLang(): void {
    if(this.firstload){
      this.firstload = false;
      return;
    }else{
      if(this.translate.currentLang==="pt-BR"){
        localStorage.setItem('lang', "en");
      }else{
        localStorage.setItem('lang', "pt-BR");
      }
      setTimeout(() => window.location.reload(),500);
    }
  }

}
