import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { getValue } from 'microedge-rxstate/dist/helpers';
import { Statuses } from './link-records-statuses';
import { LinkRecordsMatchItemModel } from './link-records-match-item.model';

@Injectable()
export class LinkRecordsStateService {
  matches: BehaviorSubject<Array<LinkRecordsMatchItemModel>> =
    new BehaviorSubject<Array<LinkRecordsMatchItemModel>>([]);
  cleanMatches: Observable<Array<LinkRecordsMatchItemModel>>;

  constructor() {
    this.cleanMatches = this.matches.asObservable()
      .map(matches => matches.filter(m =>
        m.status !== Statuses.NoMatch || !Statuses.isValid(status)
      ));
  }

  load(data: Array<LinkRecordsMatchItemModel>) {
    this.matches.next(data);
  }

  updateStatus(key: string, status: string) {
    if (!Statuses.isValid(status)) {
      throw new Error("Invalid status");
    }

    this.cleanMatches
      .take(1)
      .subscribe(matches => {
        let newMatches = matches.map(match => {
          if (match.key !== key) {
            return match;
          }

          let newMatch = new LinkRecordsMatchItemModel(match);
          newMatch.status = status;

          return newMatch;
        });

        this.load(newMatches);
      });
  }

  updateFields(key: string, fields: {[key: string]: any}) {
    this.cleanMatches
      .take(1)
      .subscribe(matches => {
        let newMatches = matches.map(match => {
          if (match.key !== key) {
            return match;
          }

          let newMatch = new LinkRecordsMatchItemModel(match);
          newMatch.item = Object.assign(newMatch, fields);

          return newMatch;
        });

        this.load(newMatches);
      });
  }
}
