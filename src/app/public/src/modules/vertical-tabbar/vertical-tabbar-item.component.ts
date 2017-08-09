import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

@Component({
    selector: 'sky-contrib-vertical-tabbar-item',
    templateUrl: './vertical-tabbar-item.component.html'
})
export class SkyContribVerticalTabbarItemComponent implements OnInit {
  @Input() public title: string;
  @Input() public active: boolean = false;
  @Input() public disabled: boolean = false;
  @Input() public invalid: boolean = false;
  @Input() public required: boolean = false;
  @Output() public action = new EventEmitter();

  public ngOnInit() {
    if (this.title === undefined || this.title.length === 0) {
      throw new Error('Sky Vertical Tabbar Item requires a [title].');
    }
  }
}
