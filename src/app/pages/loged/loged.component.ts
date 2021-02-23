import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token.storage.service';

const USER_TOKEN = 'token'

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html'
})
export class LogedComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,private router: Router) {}

  ngOnInit() {
    document.getElementById("body").classList.remove("bg-gradient-primary");
    /* this.tokenStorage.getItem(USER_TOKEN)
      .subscribe((token) => {
        if (!token) {
          this.router.navigate(['/']);
        }
      }); */
  }

  deslogar() {
    this.tokenStorage.removeItem(USER_TOKEN).subscribe(() => {
      
    });
  }  

}
