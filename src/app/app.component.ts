import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plannic';
  constructor(
    private translateSerivce: TranslateService
  ){
    this.translateSerivce.setDefaultLang('pt-BR');
    this.translateSerivce.use(localStorage.getItem('lang') || 'pt-BR')
  }
}
