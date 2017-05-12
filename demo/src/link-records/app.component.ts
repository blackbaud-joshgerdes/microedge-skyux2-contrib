import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MicroedgeSkyContribModule } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';
import { Observable } from 'rxjs/Rx';
import {
  LinkRecordsMatchItemModel
} from '../../../src/modules/link-records/link-records-match-item.model';
import {
  Statuses
} from '../../../src/modules/link-records/link-records-statuses';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './app.component.html'
})
class AppComponent {
  public items: Observable<any> = Observable.of([
    { id: '1', address: 101, name: 'Apple', description: 'Anne eats apples' },
    { id: '2', address: 202, name: 'Banana', description: 'Ben eats bananas' },
    { id: '3', address: 303, name: 'Pear', description: 'Patty eats pears' },
    { id: '4', address: 404, name: 'Grape', description: 'George eats grapes' },
    { id: '5', address: 505, name: 'Banana', description: 'Becky eats bananas' },
    { id: '6', address: 606, name: 'Lemon', description: 'Larry eats lemons' },
    { id: '7', address: 707, name: 'Strawberry', description: 'Sally eats strawberries' }
  ]);

  public matches: Observable<Array<LinkRecordsMatchItemModel>> = Observable.of([
    new LinkRecordsMatchItemModel({
      key: '1',
      status: null,
      item: null
    }),
    new LinkRecordsMatchItemModel({
      key: '2',
      status: Statuses.Edit,
      item: { id: '22', address: 111, name: 'Big Apple', description: 'George and his apples' }
    }),
    new LinkRecordsMatchItemModel({
      key: '3',
      status: Statuses.Suggested,
      item: { id: '11', address: 333, name: 'Perfect Pear', description: 'Peach loves pears' }
    }),
    new LinkRecordsMatchItemModel({
      key: '4',
      status: Statuses.Created,
      item: { id: '44', address: 777, name: 'Grape Ape', description: 'Jane loves bananas' }
    }),
    new LinkRecordsMatchItemModel({
      key: '5',
      status: Statuses.NoMatch,
      item: null
    }),
    new LinkRecordsMatchItemModel({
      key: '7',
      status: Statuses.Linked,
      item: { id: '77', address: 999, name: 'Strawberry Shortcake', description: 'Steve loves strawberries' }
    })
  ]);
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    MicroedgeSkyContribModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
