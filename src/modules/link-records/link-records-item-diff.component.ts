import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LinkRecordsState, LinkRecordsStateDispatcher } from './state';
import { LinkRecordsFieldsSetFieldsAction } from './state/fields/actions';
import { LinkRecordsSelectedSetSelectedAction } from './state/selected/actions';
import { LinkRecordsFieldModel } from './state/fields/field.model';
import { LinkRecordsMatchModel } from './state/matches/match.model';
import { Statuses } from './link-records-statuses';

@Component({
    selector: 'sky-contrib-link-records-item-diff',
    templateUrl: './link-records-item-diff.component.html',
    styleUrls: ['./link-records-item-diff.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribLinkRecordsItemDiffComponent implements OnInit {
  Statuses = Statuses;
  @Input() readOnly: boolean = false;
  @Input() key: string;
  @Input() item: any;
  @Input() match: LinkRecordsMatchModel;
  @Input() fields: Array<string>;

  constructor(
    private state: LinkRecordsState,
    private dispatcher: LinkRecordsStateDispatcher
  ) {}

  ngOnInit() {
    if (this.key == null) {
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
  }

  setFieldSelected(fieldKey: string, ev: any) {
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
