import { Component, ContentChildren, Input, TemplateRef, ChangeDetectionStrategy,
  forwardRef, QueryList, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { LinkRecordsState, LinkRecordsStateDispatcher, LinkRecordsStateModel } from './state';
import { LinkRecordsMatchesLoadAction } from './state/matches/actions';
import { LinkRecordsResultsLoadAction } from './state/results/actions';
import { LinkRecordsMatchModel } from './state/matches/match.model';
import { LinkRecordsFieldModel } from './state/fields/field.model';
import { LinkRecordsResultModel } from './state/results/result.model';
import { LinkRecordsItemModel } from './link-records-item.model';
import { SkyContribLinkRecordsItemTitleComponent } from './link-records-item-title.component';
import { SkyContribLinkRecordsItemContentComponent } from './link-records-item-content.component';
import { SkyContribLinkRecordsMatchContentComponent } from './link-records-match-content.component';
import {
  SkyContribLinkRecordsNoMatchContentComponent
} from './link-records-nomatch-content.component';
import { Statuses } from './link-records-statuses';
import { LinkRecordsApi } from './link-records-api';

@Component({
    selector: 'sky-contrib-link-records',
    templateUrl: './link-records.component.html',
    styleUrls: ['./link-records.component.scss'],
    providers: [
      LinkRecordsState,
      LinkRecordsStateDispatcher,
      LinkRecordsStateModel,
      LinkRecordsApi
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribLinkRecordsComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() items: Observable<Array<any>> = Observable.of([]);
  @Input() matches: Observable<Array<LinkRecordsMatchModel>> = Observable.of([]);
  @Input() matchFields: Observable<Array<string>> = Observable.of([]);
  @Input() itemTemplate: TemplateRef<any>;
  @Input() matchTemplate: TemplateRef<any>;
  @Input() noMatchTemplate: TemplateRef<any>;
  @Input() itemTitleTemplate: TemplateRef<any>;
  @Input() keyIdSelector: string = 'id';
  @ContentChildren(forwardRef(() => SkyContribLinkRecordsItemTitleComponent))
    nodeItemTitle: QueryList<SkyContribLinkRecordsItemTitleComponent>;
  @ContentChildren(forwardRef(() => SkyContribLinkRecordsItemContentComponent))
    nodeItem: QueryList<SkyContribLinkRecordsItemContentComponent>;
  @ContentChildren(forwardRef(() => SkyContribLinkRecordsMatchContentComponent))
    nodeMatch: QueryList<SkyContribLinkRecordsMatchContentComponent>;
  @ContentChildren(forwardRef(() => SkyContribLinkRecordsNoMatchContentComponent))
    nodeNoMatch: QueryList<SkyContribLinkRecordsNoMatchContentComponent>;
  private subscriptions: Array<any> = [];

  constructor(
    private state: LinkRecordsState,
    private dispatcher: LinkRecordsStateDispatcher
  ) {}

  ngOnInit() {
    if (this.items && !(this.items instanceof Observable)) {
      this.items = Observable.of(this.items);
    }

    if (this.matches && !(this.matches instanceof Observable)) {
      this.matches = Observable.of(this.matches);
    }

    if (this.matchFields && !(this.matchFields instanceof Observable)) {
      this.matchFields = Observable.of(this.matchFields);
    }

    this.matches.distinctUntilChanged().subscribe(matches => {
      this.dispatcher.next(new LinkRecordsMatchesLoadAction(matches, true));
    });

    this.matchFields.distinctUntilChanged().subscribe(fields => {
      if (fields.indexOf(this.keyIdSelector) > -1) {
        throw new Error("'keyIdSelector' cannot be a match field.");
      }
    });

    Observable.combineLatest(
      this.state.map(s => s.matches.items).distinctUntilChanged(),
      this.state.map(s => s.fields.item).distinctUntilChanged(),
      this.state.map(s => s.selected.item || {}).distinctUntilChanged(),
      (matches: Array<LinkRecordsMatchModel>,
      fields: {[key: string]: Array<LinkRecordsFieldModel>},
      selected: {[key: string]: {[key: string]: boolean}}) => {
        let newResultItems = matches.map(match => {
          let newItem = new LinkRecordsResultModel(match);
          if (newItem.status === Statuses.Linked) {
            let newFields = (fields[newItem.key]) ? fields[newItem.key] : [];
            let selection = selected[match.key] || {};
            newFields.forEach(f => {
              if (selection[f.key]) {
                newItem.item[f.key] = f.newValue;
              }
            });
          } else {
            newItem.item = null;
          }

          return newItem;
        }).filter(f => f != null);

        this.dispatcher.next(new LinkRecordsResultsLoadAction(newResultItems, true));
      }).subscribe();
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

    if (this.nodeNoMatch.length > 0) {
      this.noMatchTemplate = this.nodeNoMatch.first.template;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get records() {
    return Observable.combineLatest(
      this.items.distinctUntilChanged(),
      this.state.map(s => s.matches.items).distinctUntilChanged(),
      this.matchFields.distinctUntilChanged(),
      (items: Array<any>, matches: Array<LinkRecordsMatchModel>, fields: Array<string>) => {
        return items.map(item => {
          let itemMatches = matches.filter(match => match.key === item[this.keyIdSelector]);
          let match = (itemMatches.length > 0) ? itemMatches[0] : new LinkRecordsMatchModel();

          return new LinkRecordsItemModel({
            key: item[this.keyIdSelector],
            status: (match.status) ? match.status : Statuses.NoMatch,
            item: item,
            match: (match.status !== Statuses.NoMatch) ? match : null,
            matchFields: fields
          });
        });
    });
  }

  get results() {
    return this.state.map(s => s.results.items).distinctUntilChanged();
  }
}
