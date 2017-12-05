import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SkyContribListViewGridComponent } from '../../public/src/modules/list-view-grid';
import { ListItemModel } from '../../public/src/modules/list/state';

@Component({
  selector: 'sky-contrib-list-view-grid-demo',
  templateUrl: './list-view-grid-demo.component.html'
})
export class SkyContribListViewGridDemoComponent {
  @ViewChild(SkyContribListViewGridComponent) public grid: SkyContribListViewGridComponent;

  public items: Observable<any> = Observable.of([
    { id: '1', column1: 101, column2: 'Apple', column3: 'Anne eats apples' },
    { id: '2', column1: 102, column2: 'Banana', column3: 'Ben eats bananas' },
    { id: '3', column1: 103, column2: 'Pear', column3: 'Patty eats pears' },
    { id: '4', column1: 104, column2: 'Grape', column3: 'George eats grapes' },
    { id: '5', column1: 105, column2: 'Banana', column3: 'Becky eats bananas' },
    { id: '6', column1: 106, column2: 'Lemon', column3: 'Larry eats lemons' },
    { id: '7', column1: 107, column2: 'Strawberry', column3: 'Sally eats strawberries' },
    { id: '8', column1: 201, column2: 'Apple', column3: 'Anne eats apples' },
    { id: '9', column1: 202, column2: 'Banana', column3: 'Ben eats bananas' },
    { id: '10', column1: 203, column2: 'Pear', column3: 'Patty eats pears' },
    { id: '11', column1: 204, column2: 'Grape', column3: 'George eats grapes' },
    { id: '12', column1: 205, column2: 'Banana', column3: 'Becky eats bananas' },
    { id: '13', column1: 206, column2: 'Lemon', column3: 'Larry eats lemons' },
    { id: '14', column1: 207, column2: 'Strawberry', column3: 'Sally eats strawberries' }
  ]);

  public toggleSelected(event: any, item: any) {
    this.grid.toggleSelected(event, new ListItemModel(item.id, item));
  }
}
