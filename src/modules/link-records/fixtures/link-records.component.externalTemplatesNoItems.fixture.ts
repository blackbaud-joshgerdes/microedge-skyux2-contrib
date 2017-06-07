import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MicroedgeSkyContribModule } from '../../../../src/core';
import { Bootstrapper } from '../../../../visual/bootstrapper';
import { Observable } from 'rxjs/Rx';
import { Statuses } from '../link-records-statuses';
import { LinkRecordsMatchModel } from '../state/matches/match.model';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './link-records.component.externalTemplatesNoItems.fixture.html'
})
export class SkyLinkRecordsExternalTemplatesTestComponent {
  public matchFields: Array<string> = ['description', 'name'];

  public items: Observable<any> = Observable.of([
    { id: '1', address: 101, name: 'Apple', description: 'Anne eats apples' },
    { id: '2', address: 202, name: 'Banana', description: 'Ben eats bananas' },
    { id: '3', address: 303, name: 'Pear', description: 'Patty eats pears' },
    { id: '4', address: 404, name: 'Grape', description: 'George eats grapes' },
    { id: '5', address: 505, name: 'Banana', description: 'Becky eats bananas' },
    { id: '6', address: 606, name: 'Lemon', description: 'Larry eats lemons' },
    { id: '7', address: 707, name: 'Kiwi', description: 'Kim eats kiwis.' },
    { id: '8', address: 808, name: 'Strawberry', description: 'Sally eats strawberries' }
  ]);

  public matches: Observable<Array<LinkRecordsMatchModel>> = Observable.of([
    new LinkRecordsMatchModel({
      key: '1',
      status: Statuses.Edit,
      item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
    }),
    new LinkRecordsMatchModel({
      key: '2',
      status: null,
      item: null
    }),
    new LinkRecordsMatchModel({
      key: '3',
      status: Statuses.NoMatch,
      item: null
    }),
    new LinkRecordsMatchModel({
      key: '5',
      status: Statuses.Suggested,
      item: { id: '55', address: 555, name: 'Huge Banana', description: 'Barry loves bananas.' }
    }),
    new LinkRecordsMatchModel({
      key: '6',
      status: Statuses.Selected,
      item: { id: '66', address: 666, name: 'Lovely Lemons', description: 'Lisa loves lemons.' }
    }),
    new LinkRecordsMatchModel({
      key: '7',
      status: Statuses.Created,
      item: null
    }),
    new LinkRecordsMatchModel({
      key: '8',
      status: Statuses.Linked,
      item: {
        id: '88',
        address: 888,
        name: 'Strawberry Shortcake',
        description: 'Steve loves strawberries'
      }
    })
  ]);
}
