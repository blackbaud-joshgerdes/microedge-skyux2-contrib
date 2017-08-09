import { Component } from '@angular/core';
import { SkyContribConsoleService } from '../shared';

@Component({
  selector: 'sky-contrib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class SkyContribNavbarComponent {
  constructor(private consoleService: SkyContribConsoleService) {
    this.consoleService.deprecated('sky-contrib-navbar', 'sky-navbar');
  }
}
