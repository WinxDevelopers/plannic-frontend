import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/service/token.storage.service';

@Component({
  selector: 'dash-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    public translate: TranslateService) { }

  ngOnInit() {
  }

  switchLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
  deslogar() {
    this.tokenStorage.removeItem('token').subscribe(() => {
      this.router.navigate(['../']);
    });
  }  
}
