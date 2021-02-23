import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/service/token.storage.service';

const USER_TOKEN = 'token'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  public isPortugues:boolean = true;
  public lang;
  public isLogged:boolean;

  constructor(
    public translate: TranslateService,
    private tokenStorage: TokenStorageService,
  ) {
    this.lang = localStorage.getItem('lang') || 'pt-BR';
    translate.addLangs(['pt-BR', 'en']);
   }

  ngOnInit() {
    document.getElementById("body").classList.remove("bg-gradient-primary");
    this.tokenStorage.getItem(USER_TOKEN)
      .subscribe((token) => {
        if (!token) {
          this.isLogged = false;
        }else{
          this.isLogged = true;
        }
      });
  }

  switchLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}