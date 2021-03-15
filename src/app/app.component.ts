import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
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
