import { ListState } from './state';
import { OnDestroy } from '@angular/core';
import { SkyContribListComponent } from '../list/list.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

export abstract class ListViewComponent implements OnDestroy {
  protected viewName: string;
  protected state: ListState;
  protected list: SkyContribListComponent;
  protected subscriptions: Array<any> = [];
  protected initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private viewId: string = moment().toDate().getTime().toString();

  constructor(state: ListState, defaultName: string) {
    this.state = state;
    this.viewName = defaultName;
    this.active.distinctUntilChanged().subscribe(
      isActive => isActive ? this.onViewActive() : this.onViewInactive()
    );
  }

  get id(): string {
    return this.viewId;
  }

  get label(): string {
    return this.viewName;
  }

  get hasToolbar(): Observable<boolean> {
    return this.state.map(s => s.toolbar.exists);
  }

  get active(): Observable<boolean> {
    return this.state.map(s => s.views.active === this.viewId);
  }

  /* istanbul ignore next */
  public onViewActive() {
  }

  public onViewInactive() {
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
