import {
  Component, Input, TemplateRef, ViewChild, ViewContainerRef, ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { LinkRecordsMatchModel } from './state/matches/match.model';
import { LinkRecordsApi } from './link-records-api';

@Component({
  selector: 'sky-contrib-link-records-renderer',
  template: '<ng-template #container></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribLinkRecordsRendererComponent implements OnInit {
  @Input() item: any;
  @Input() match: LinkRecordsMatchModel;
  @Input() fields: Array<string>;
  @Input() template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(public api: LinkRecordsApi) {}

  ngOnInit() {
    /* istanbul ignore else */
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
