import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/service/token.storage.service';
import { Router } from '@angular/router';


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
    private router: Router
  ) {
    this.lang = localStorage.getItem('lang') || 'pt-BR';
    translate.addLangs(['pt-BR', 'en']);
   }

  ngOnInit() {
    document.getElementById("body").classList.remove("bg-gradient-primary");
    this.tokenStorage.getItem('token')
      .subscribe((token) => {
        if (!token) {
          this.isLogged = false;
        }else{
          this.isLogged = true;
        }
      });
      this.tokenStorage.getItem('token')
      .subscribe((token) => {
        if (!token) {
          this.router.navigate(['../']);
        }else{
          this.router.navigate(['dashboard/calendario']);          
        }
      });
  }

  switchLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}