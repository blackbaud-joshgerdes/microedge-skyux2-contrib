import { Component } from '@angular/core';
import { SkyContribConsoleService } from '../shared';

@Component({
  selector: 'sky-contrib-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SkyContribSpinnerComponent {
  constructor(private consoleService: SkyContribConsoleService) {
    this.consoleService.deprecated('sky-contrib-spinner', 'sky-wait');
  }
}
