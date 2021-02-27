import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html'
})
export class LogedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    document.getElementById("body").classList.remove("bg-gradient-primary");
    if (!localStorage.getItem('token')) {
      this.router.navigate(['../']);
    } else {
      this.router.navigate(['dashboard/calendario']);
    }
  }

}
