import {
  Component, Input, TemplateRef, ViewChild, ViewContainerRef, ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { LinkRecordsItemModel } from './link-records-item.model';
import { LinkRecordsMatchItemModel } from './link-records-match-item.model';

@Component({
  selector: 'sky-contrib-link-records-renderer',
  template: '<template #container></template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribLinkRecordsRendererComponent implements OnInit {
  @Input() item: any;
  @Input() match: LinkRecordsMatchItemModel;
  @Input() template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
