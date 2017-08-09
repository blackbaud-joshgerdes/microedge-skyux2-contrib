import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-contrib-list-toolbar-sort',
  template: ''
})
export class SkyContribListToolbarSortComponent {
  @Input() public label: string;
  @Input('field') public field: string;
  @Input('type') public type: string;
}
