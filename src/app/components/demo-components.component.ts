import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import { SkyContribDemoComponent } from './demo-component';
import { SkyContribDemoComponentsService } from './demo-components.service';
import { SkyContribDemoTitleService } from '../shared/title.service';

@Component({
  selector: 'sky-demo-components',
  templateUrl: './demo-components.component.html',
  styleUrls: ['./demo-components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribDemoComponentsComponent implements OnInit {
  public get components(): SkyContribDemoComponent[] {
    return this.componentService.getComponents();
  }

  constructor(
    private titleService: SkyContribDemoTitleService,
    private componentService: SkyContribDemoComponentsService
  ) { }

  public ngOnInit() {
    this.titleService.setTitle('Components');
  }
}
