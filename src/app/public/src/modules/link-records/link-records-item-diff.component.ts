import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LinkRecordsState, LinkRecordsStateDispatcher } from './state';
import { LinkRecordsFieldsSetFieldsAction } from './state/fields/actions';
import { LinkRecordsSelectedSetSelectedAction } from './state/selected/actions';
import { LinkRecordsFieldModel } from './state/fields/field.model';
import { LinkRecordsMatchModel } from './state/matches/match.model';
import { STATUSES } from './link-records-statuses';

@Component({
    selector: 'sky-contrib-link-records-item-diff',
    templateUrl: './link-records-item-diff.component.html',
    styleUrls: ['./link-records-item-diff.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribLinkRecordsItemDiffComponent implements OnInit {
  public STATUSES = STATUSES;
  @Input() public readOnly: boolean = false;
  @Input() public key: string;
  @Input() public item: any;
  @Input() public match: LinkRecordsMatchModel;
  @Input() public fields: Array<string>;
  @Input() public selectedByDefault: boolean;

  constructor(
    private state: LinkRecordsState,
    private dispatcher: LinkRecordsStateDispatcher
  ) {}

  public ngOnInit() {
    if (this.key === undefined) {
      throw new Error("'key' is required.");
    }

    let matchFields = Object.keys(this.match.item)
      .filter(id => this.item.hasOwnProperty(id)
        && this.match.item.hasOwnProperty(id)
        && this.fields.indexOf(id) > -1
        && (this.item[id] !== this.match.item[id]))
      .map(id => {
        return new LinkRecordsFieldModel({
          key: id,
          currentValue: this.match.item[id],
          newValue: this.item[id]
        });
      });

    this.dispatcher.next(new LinkRecordsFieldsSetFieldsAction(this.key, matchFields));

    this.state.map(s => s.selected.item || {})
      .filter(s => this.selectedByDefault !== undefined)
      .take(1)
      .subscribe(selected => {
        matchFields.forEach(matchField => {
          if (selected[this.key] && selected[this.key].hasOwnProperty(matchField.key)) {
            return;
          }

          if (typeof this.selectedByDefault === 'string') {
            this.selectedByDefault = String(this.selectedByDefault) === 'true';
          }

          this.dispatcher.next(new LinkRecordsSelectedSetSelectedAction(
            this.key,
            matchField.key,
            this.selectedByDefault
          ));
        });
      });
  }

  public setFieldSelected(fieldKey: string, ev: any) {
    this.dispatcher.next(
      new LinkRecordsSelectedSetSelectedAction(this.key, fieldKey, ev.checked));
  }

  get fieldValues() {
    return Observable.combineLatest(
      this.state.map(s => s.fields.item[this.key] || []).distinctUntilChanged(),
      this.state.map(s => s.selected.item[this.key] || {}).distinctUntilChanged(),
      (fields: LinkRecordsFieldModel[], selected: {[key: string]: boolean}) => {
        return fields.map(f => {
          return {
            field: f,
            selected: selected[f.key] || false
          };
        });
      });
  }
}
