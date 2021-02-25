import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements OnInit {

  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }

}
