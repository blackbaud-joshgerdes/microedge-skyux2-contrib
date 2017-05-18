import {
  Component, Input, TemplateRef, QueryList, ViewChildren, ChangeDetectionStrategy, AfterContentInit
} from '@angular/core';
import { LinkRecordsState, LinkRecordsStateDispatcher } from './state';
import {
  LinkRecordsMatchesSetStatusAction,
  LinkRecordsMatchesSetItemAction
} from './state/matches/actions';
import { LinkRecordsFieldsSetFieldsAction } from './state/fields/actions';
import { Statuses } from './link-records-statuses';
import { LinkRecordsItemModel } from './link-records-item.model';
import { SkyContribLinkRecordsItemDiffComponent } from './link-records-item-diff.component';

@Component({
    selector: 'sky-contrib-link-records-item',
    templateUrl: './link-records-item.component.html',
    styleUrls: ['./link-records-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribLinkRecordsItemComponent implements AfterContentInit {
  Statuses = Statuses;
  @Input() record: LinkRecordsItemModel;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() matchTemplate: TemplateRef<any>;
  @Input() noMatchTemplate: TemplateRef<any>;
  @Input() itemTitleTemplate: TemplateRef<any>;
  @ViewChildren(SkyContribLinkRecordsItemDiffComponent)
    viewItems: QueryList<SkyContribLinkRecordsItemDiffComponent>;

  constructor(
    private state: LinkRecordsState,
    private dispatcher: LinkRecordsStateDispatcher
  ) {}

  ngAfterContentInit() {
    if (this.record.status === Statuses.Edit &&
      (!this.record.matchFields || this.record.matchFields.length === 0)) {
      this.link();
    }
  }

  get updatedFieldsTotal() {
    return this.state
      .map(s => s.selected.item[this.record.key] || {})
      .map(fields => Object.keys(fields).filter(k => fields[k]).length)
      .distinctUntilChanged();
  }

  link() {
    this.dispatcher.next(new LinkRecordsMatchesSetStatusAction(this.record.key, Statuses.Linked));
  }

  unlink() {
    this.dispatcher.next(new LinkRecordsFieldsSetFieldsAction(this.record.key, []));
    this.dispatcher.next(new LinkRecordsMatchesSetStatusAction(this.record.key, Statuses.NoMatch));
    this.dispatcher.next(new LinkRecordsMatchesSetItemAction(this.record.key, null));
  }

  create() {
    this.dispatcher.next(new LinkRecordsMatchesSetStatusAction(this.record.key, Statuses.Created));
    this.dispatcher.next(new LinkRecordsMatchesSetItemAction(this.record.key, this.record.item));
  }

  edit() {
    let status = (this.record.matchFields && this.record.matchFields.length > 0) ?
      Statuses.Edit : Statuses.Linked;

    this.dispatcher.next(new LinkRecordsMatchesSetStatusAction(this.record.key, status));
  }

  cancelEdit() {
    this.dispatcher.next(
      new LinkRecordsMatchesSetStatusAction(this.record.key, Statuses.Suggested));
  }
}
