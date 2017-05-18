import { Injectable } from '@angular/core';
import { LinkRecordsState, LinkRecordsStateDispatcher } from './state';
import {
  LinkRecordsMatchesSetStatusAction,
  LinkRecordsMatchesSetItemAction
} from './state/matches/actions';
import { Statuses } from './link-records-statuses';

@Injectable()
export class LinkRecordsApi {
  constructor(
    private state: LinkRecordsState,
    private dispatcher: LinkRecordsStateDispatcher
  ) {}

  addSelectedItem(key: string, item: any) {
    this.dispatcher.next(new LinkRecordsMatchesSetStatusAction(key, Statuses.Selected));
    this.dispatcher.next(new LinkRecordsMatchesSetItemAction(key, item));
  }
}
