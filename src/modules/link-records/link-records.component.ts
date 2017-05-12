import { Component, ContentChildren, Input, TemplateRef, ChangeDetectionStrategy,
  forwardRef, QueryList } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { getValue } from 'microedge-rxstate/dist/helpers';
import { LinkRecordsStateService } from './link-records-state.service';
import { SkyContribLinkRecordsItemTitleComponent } from './link-records-item-title.component';
import { SkyContribLinkRecordsItemContentComponent } from './link-records-item-content.component';
import { SkyContribLinkRecordsMatchContentComponent } from './link-records-match-content.component';
import { LinkRecordsMatchItemModel } from './link-records-match-item.model';
import { LinkRecordsItemModel } from './link-records-item.model';
import { Statuses } from './link-records-statuses';

@Component({
    selector: 'sky-contrib-link-records',
    templateUrl: './link-records.component.html',
    styleUrls: ['./link-records.component.scss'],
    providers: [LinkRecordsStateService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribLinkRecordsComponent {
  @Input() items: Observable<Array<any>> = Observable.of([]);
  @Input() matches: Array<LinkRecordsMatchItemModel> |
    Observable<Array<LinkRecordsMatchItemModel>> = Observable.of([]);
  @Input() itemTemplate: TemplateRef<any>;
  @Input() matchTemplate: TemplateRef<any>;
  @Input() itemTitleTemplate: TemplateRef<any>;
  @Input() keyIdSelector: string = 'id';

  @ContentChildren(forwardRef(() => SkyContribLinkRecordsItemTitleComponent)) nodeItemTitle: QueryList<SkyContribLinkRecordsItemTitleComponent>;
  @ContentChildren(forwardRef(() => SkyContribLinkRecordsItemContentComponent)) nodeItem: QueryList<SkyContribLinkRecordsItemContentComponent>;
  @ContentChildren(forwardRef(() => SkyContribLinkRecordsMatchContentComponent)) nodeMatch: QueryList<SkyContribLinkRecordsMatchContentComponent>;

  constructor(public state: LinkRecordsStateService) {}

  ngOnInit() {
    if (this.items && !(this.items instanceof Observable)) {
      this.items = Observable.of(this.items);
    }

    getValue(this.matches, (m: LinkRecordsMatchItemModel[]) => this.state.load(m));
  }

  ngAfterContentInit() {
    if (this.nodeItemTitle.length > 0) {
      this.itemTitleTemplate = this.nodeItemTitle.first.template;
    }

    if (this.nodeItem.length > 0) {
      this.itemTemplate = this.nodeItem.first.template;
    }

    if (this.nodeMatch.length > 0) {
      this.matchTemplate = this.nodeMatch.first.template;
    }
  }

  get records() {
    return Observable.combineLatest(
      this.items.distinctUntilChanged(),
      this.state.matches.distinctUntilChanged(),
      (items: Array<any>, matches: Array<LinkRecordsMatchItemModel>) => {
        return items.map(item => {
          let itemMatches = matches.filter(match => match.key === item[this.keyIdSelector]);
          let match = (itemMatches.length > 0) ? itemMatches[0] : new LinkRecordsMatchItemModel();

          return new LinkRecordsItemModel({
            key: item[this.keyIdSelector],
            status: (match.status) ? match.status : Statuses.NoMatch,
            item: item,
            match: (match.status != Statuses.NoMatch) ? match : null
          });
        });
    });
  }

  get results() {
    return this.state.cleanMatches;
  }
}
