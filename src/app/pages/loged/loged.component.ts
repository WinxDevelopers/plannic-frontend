import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token.storage.service';

const USER_TOKEN = 'token'

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html'
})
export class LogedComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    document.getElementById("body").classList.remove("bg-gradient-primary");
    const token = localStorage.getItem(USER_TOKEN)
    if (!token) {
      this.router.navigate(['../']);
    } else {
      this.router.navigate(['dashboard/calendario']);
    }
  }

}
