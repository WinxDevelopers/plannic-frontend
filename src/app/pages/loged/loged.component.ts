import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html'
})
export class LogedComponent implements OnInit {

  constructor(private router: Router,
    public translate: TranslateService) { }

  ngOnInit() {
    document.getElementById("body").classList.remove("bg-gradient-primary");
    if (!localStorage.getItem('token')) {
      this.router.navigate(['../']);
    } else {
      if(window.location.href.endsWith("dashboard"))
        this.router.navigate(['dashboard/calendario']);
    }
  }
  switchLang(lang: string): void {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

}
