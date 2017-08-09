import { Component } from '@angular/core';
import { SkyContribConsoleService } from '../shared';

@Component({
  selector: 'sky-contrib-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss']
})
export class SkyContribTabBarComponent {
  constructor(private consoleService: SkyContribConsoleService) {
    this.consoleService.deprecated('sky-contrib-tabbar', 'sky-tabset');
  }
}
