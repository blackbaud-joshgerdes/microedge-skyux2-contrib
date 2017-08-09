import {
  Component, Input, TemplateRef, ViewChild, ViewContainerRef, ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { ListItemModel } from '../list/state/items/item.model';

@Component({
  selector: 'sky-contrib-list-view-grid-renderer',
  template: '<ng-template #container></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribListViewGridRendererComponent implements OnInit {
  @Input() public item: ListItemModel;
  @Input() public template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

  public ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }

  get row() {
    return this.item.data;
  }
}
