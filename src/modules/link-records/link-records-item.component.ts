import { Component, Input, TemplateRef } from '@angular/core';
import { LinkRecordsStateService } from './link-records-state.service';
import { LinkRecordsItemModel } from './link-records-item.model';
import { Statuses } from './link-records-statuses';

@Component({
    selector: 'sky-contrib-link-records-item',
    templateUrl: './link-records-item.component.html',
    styleUrls: ['./link-records-item.component.scss']
})
export class SkyContribLinkRecordsItemComponent {
  Statuses = Statuses;
  @Input() record: LinkRecordsItemModel;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() matchTemplate: TemplateRef<any>;
  @Input() itemTitleTemplate: TemplateRef<any>;

  constructor(public state: LinkRecordsStateService) {}

  link() {
    this.state.updateStatus(this.record.key, Statuses.Linked);
  }

  unlink() {
    this.state.updateStatus(this.record.key, Statuses.NoMatch);
  }

  create() {
    this.state.updateStatus(this.record.key, Statuses.Created);
  }

  edit() {
    this.state.updateStatus(this.record.key, Statuses.Edit);
  }

  cancelEdit() {
    this.state.updateStatus(this.record.key, Statuses.Suggested);
  }
}
