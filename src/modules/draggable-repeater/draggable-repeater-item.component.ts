import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'sky-contrib-draggable-repeater-item',
    templateUrl: './draggable-repeater-item.component.html',
    styleUrls: [
      './draggable-repeater-item.component.scss'
    ]
})
export class SkyDraggableRepeaterItemComponent {
  @Input() isExpandable: boolean = false;
  @Input() showContent: boolean = false;
  @Input() id: string;
  private isExpanded: boolean = true;

  @HostBinding('attr.repeater-item-id') get repeaterItemId() { return this.id; };

  ngOnInit() {
    if (this.id == null) {
      throw new Error('You must supply [id] to the grid control for it to function');
    }
  }

  toggle(event: any) {
    this.isExpanded = !this.isExpanded;
  }
}
