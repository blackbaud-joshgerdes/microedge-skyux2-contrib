import { Component, Input, AfterContentInit } from '@angular/core';
import { ListState, ListStateDispatcher } from '../list/state';
import {
  ListSelectedSetItemsSelectedAction,
  ListSelectedLoadAction
} from '../list/state/selected/actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sky-contrib-list-action-bar',
  templateUrl: './list-action-bar.component.html',
  styleUrls: ['./list-action-bar.component.scss']
})
export class SkyContribListActionBarComponent implements AfterContentInit {
  @Input() public alwaysOn: boolean | Observable<boolean> = Observable.of(false);
  public isAlwaysOn: Observable<boolean>;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {
  }

  public ngAfterContentInit() {
    this.isAlwaysOn = (this.alwaysOn instanceof Observable) ?
      this.alwaysOn as Observable<boolean> : Observable.of(this.alwaysOn as boolean);
  }

  get selectedItemCount(): Observable<number> {
    return this.state.map(s => {
      return Object.keys(s.selected.item).length;
    }).distinctUntilChanged();
  }

  public selectAll(): void {
    this.state.map(s => s.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher.next(new ListSelectedSetItemsSelectedAction(items));
      });
  }

  public clearAll(): void {
    this.state.map(s => s.selected.item)
      .take(1)
      .subscribe(selected => {
        this.dispatcher.next(new ListSelectedLoadAction([]));
      });
  }
}
