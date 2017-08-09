import {
  Component, Input, TemplateRef, ViewChild, ViewContainerRef, ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { TreeNodeModel } from './tree-node.model';

@Component({
  selector: 'sky-contrib-tree-view-renderer',
  template: '<ng-template #container></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribTreeViewRendererComponent implements OnInit {
  @Input() public item: TreeNodeModel;
  @Input() public template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

  public ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
