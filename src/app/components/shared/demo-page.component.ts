import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { SkyContribDemoTitleService } from '../../shared/title.service';

@Component({
  selector: 'sky-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribDemoPageComponent implements OnInit {
  @Input()
  public set title(value: string) {
    this._title = value;
  }

  public get title(): string {
    return this._title;
  }

  @Input()
  public summary: string;

  private _title: string;

  constructor(private titleService: SkyContribDemoTitleService) { }

  public ngOnInit() {
    this.updateTitle();
  }

  private updateTitle() {
    if (this.title) {
      this.titleService.setTitle(this.title, 'Components');
    }
  }
}
