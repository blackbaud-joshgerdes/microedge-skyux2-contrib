import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
    selector: 'sky-contrib-vertical-tabbar-item',
    templateUrl: './vertical-tabbar-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribVerticalTabbarItemComponent implements OnInit {
  private isActive: boolean = false;
  @Input() public title: string;
  @Input() public disabled: boolean = false;
  @Input() public invalid: boolean = false;
  @Input() public required: boolean = false;
  @Output() public action = new EventEmitter();
  @Input() public set active(value) {
    this.isActive = value;
    this.cdr.detectChanges();
  }
  public get active() {
    return this.isActive;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit() {
    if (this.title === undefined || this.title.length === 0) {
      throw new Error('Sky Vertical Tabbar Item requires a [title].');
    }
  }
}
