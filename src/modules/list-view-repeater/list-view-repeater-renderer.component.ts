import {
  Component, Input, TemplateRef, ViewChild, ViewContainerRef, ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { ListItemModel } from '../list/state/items/item.model';

@Component({
  selector: 'sky-contrib-list-view-repeater-renderer',
  template: '<ng-template #container></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewRepeaterRendererComponent implements OnInit {
  @Input() item: ListItemModel;
  @Input() template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }

  get row() {
    return this.item.data;
  }
}
