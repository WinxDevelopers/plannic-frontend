import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './service/token.storage.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

const USER_TOKEN = 'token'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'plannic';
  public isLogged: boolean = false;
  public redirectTo:string = '';

  constructor(
    public translate: TranslateService,
    private tokenStorage: TokenStorageService,
    private location: Location,
    private router: Router ){
      this.translate.addLangs(['pt-BR', 'en']);
      this.translate.setDefaultLang('pt-BR');
      this.translate.use(localStorage.getItem('lang') || 'pt-BR');
      this.tokenStorage.getItem(USER_TOKEN)
      .subscribe((token) => {
          this.isLogged = true;
        });
  }

  ngOnInit() {
    this.tokenStorage.getItem(USER_TOKEN)
      .subscribe((token) => {
        if (!token) {
          this.isLogged = false;
        }
      });
  }

  switchLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  deslogar() {
    this.tokenStorage.removeItem(USER_TOKEN).subscribe(() => {
      this.router.navigate(['/']);
      this.isLogged = false;
    });
  }
}
