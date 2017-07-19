import { Component, OnInit } from '@angular/core';

import { SkyContribDemoTitleService } from './shared/title.service';

@Component({
  selector: 'sky-demo-home',
  templateUrl: './home.component.html'
})
export class SkyContribDemoHomeComponent implements OnInit {
  constructor(private titleService: SkyContribDemoTitleService) { }

  public ngOnInit() {
    this.titleService.setTitle();
  }
}
