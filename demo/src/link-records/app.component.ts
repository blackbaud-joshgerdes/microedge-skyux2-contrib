import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MicroedgeSkyContribModule } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';
import { Observable } from 'rxjs/Rx';
import { WindowRef } from '../../../src/modules/utils/windowref';
import {
  Statuses,
  SkyContribLinkRecordsComponent,
  LinkRecordsMatchModel
} from '../../../src/modules/link-records';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './app.component.html'
})
class AppComponent {
  @ViewChild(SkyContribLinkRecordsComponent) item: SkyContribLinkRecordsComponent;
  window: any;

  constructor(windowRef: WindowRef) {
    this.window = windowRef.nativeWindow;
  }

  showResults() {
    this.results.take(1).subscribe(r => this.window.alert(JSON.stringify(r)));
  }

  get results() {
    return this.item.results;
  }

  public matchFields: Array<string> = ['description', 'name'];

  public newItem: any = { id: '99', address: 999, name: 'Lime', description: 'Laura eats limes.' };

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
      item: { id: '88', address: 888, name: 'Strawberry Shortcake', description: 'Steve loves strawberries' }
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
