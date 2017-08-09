import { Component, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListViewComponent } from '../../public';
import { ListState } from '../../public/src/modules/list/state';
import { ListItemModel } from '../../public/src/modules/list/state/items/item.model';

@Component({
  selector: 'sky-contrib-list-view-custom',
  templateUrl: './list-view-custom.component.html',
  providers: [
    {
      /* tslint:disable-next-line */
      provide: ListViewComponent, useExisting: forwardRef(() => SkyContribListViewCustomComponent)
    }
  ]
})
export class SkyContribListViewCustomComponent extends ListViewComponent {
  constructor(
    state: ListState
  ) {
    super(state, 'Custom View');
  }

  get items(): Observable<Array<ListItemModel>> {
    return this.state.map(s => s.items.items);
  }
}
