import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { STATUSES } from '../link-records-statuses';
import { LinkRecordsMatchModel } from '../state/matches/match.model';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './link-records.component.defaultTemplates.fixture.html'
})
export class SkyLinkRecordsDefaultTemplatesTestComponent {
  public matchFields: Array<string> = ['description', 'name'];

  public items: Observable<any> = Observable.of([
    { id: '1', address: 101, name: 'Apple', description: 'Anne eats apples' },
    { id: '2', address: 202, name: 'Banana', description: 'Ben eats bananas' },
    { id: '3', address: 303, name: 'Pear', description: 'Patty eats pears' }
  ]);

  public matches: Observable<Array<LinkRecordsMatchModel>> = Observable.of([
    new LinkRecordsMatchModel({
      key: '1',
      status: STATUSES.Edit,
      item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
    }),
    new LinkRecordsMatchModel({
      key: '2',
      status: undefined,
      item: undefined
    }),
    new LinkRecordsMatchModel({
      key: '3',
      status: STATUSES.Edit,
      item: { id: '22', address: 222, name: 'Pretty pear', description: 'Patrick hates pears.' }
    })
  ]);
}
