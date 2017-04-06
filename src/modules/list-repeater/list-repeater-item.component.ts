import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'sky-contrib-list-repeater-item',
    templateUrl: './list-repeater-item.component.html',
    styleUrls: [
      './list-repeater-item.component.scss'
    ]
})
export class SkyListRepeaterItemComponent {
  @Input() isEditing: boolean;
  @Input() isExpandable: boolean = false;
  @Input() showContent: boolean = false;
  @Input() id: string;
  isExpanded: boolean = true;

  @HostBinding('attr.repeater-item-id') get (): string { return this.id; };

  ngOnInit() {
    if (this.id == null) {
      throw new Error('You must supply [id] to the list repeater control for it to function');
    }
  }

  toggle(event: any) {
    this.isExpanded = !this.isExpanded;
  }
}
