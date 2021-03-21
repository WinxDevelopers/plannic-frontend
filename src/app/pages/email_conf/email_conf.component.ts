import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-email_conf',
  templateUrl: './email_conf.component.html'
})
export class Email_confComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    document.getElementById('body').classList.remove('pag_login');
    document.getElementById('body').classList.add('pag_inicial');
  }
}
