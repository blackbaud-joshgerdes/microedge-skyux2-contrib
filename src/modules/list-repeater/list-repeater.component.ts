import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SkyListRepeaterItemComponent } from './list-repeater-item.component';
import { SkyListRepeaterOptionsModel } from './models';
import { SkyListRepeaterStateDispatcher, SkyListRepeaterStateModel, SkyListRepeaterState,
  PagingOptionsSetPageSizeAction, PagingOptionsSetMaxPagesAction,
  PagingOptionsSetPageNumberAction, PagingOptionsSetPagingEnabledAction } from './state';

@Component({
    selector: 'sky-contrib-list-repeater',
    templateUrl: './list-repeater.component.html',
    providers: [SkyListRepeaterStateDispatcher, SkyListRepeaterState, SkyListRepeaterStateModel]
})
export class SkyListRepeaterComponent {
  @Input() options: SkyListRepeaterOptionsModel;
  @Input() itemCount: Observable<number>;
  @ContentChildren(SkyListRepeaterItemComponent) items: QueryList<SkyListRepeaterItemComponent>;
  private subscriptions: Array<any> = [];

  constructor(
    private dispatcher: SkyListRepeaterStateDispatcher,
    private state: SkyListRepeaterState
  ) {
  }

  ngOnInit() {
    if (!this.options) {
      this.options = new SkyListRepeaterOptionsModel();
    }

    if (!this.options.enablePaging) {
      this.dispatcher.next(new PagingOptionsSetPagingEnabledAction(false));
    } else {
      if (this.options.pageSize) {
        this.subscribeOrGet(this.options.pageSize, (pageSize: number) =>
          this.dispatcher.next(new PagingOptionsSetPageSizeAction(pageSize)));
      }

      if (this.options.maxPages) {
        this.subscribeOrGet(this.options.maxPages, (maxPages: number) =>
          this.dispatcher.next(new PagingOptionsSetMaxPagesAction(maxPages)));
      }

      if (this.options.pageNumber) {
        this.subscribeOrGet(this.options.pageNumber, (pageNumber: number) =>
          this.dispatcher.next(new PagingOptionsSetPageNumberAction(pageNumber)));
      }

      this.subscribeOrGet(this.itemCount, (itemCount: number) => {
        this.state.map(s => s.pagingOptions).take(1).subscribe(pagingOptions => {
          if (pagingOptions.enabled) {
            let pageCount = Math.floor(itemCount / pagingOptions.pageSize);
            if (pageCount * pagingOptions.pageSize < itemCount) {
              pageCount += 1;
            }

            if (pagingOptions.pageNumber > pageCount && pageCount > 0) {
              this.dispatcher.next(new PagingOptionsSetPageNumberAction(pageCount));
            }
          }
        });
      });
    }
  }

  get pagingOptions() {
    return this.state.map(s => s.pagingOptions);
  }

  get pagingEnabled() {
    return Observable.combineLatest(
      this.itemCount,
      this.pagingOptions,
      (itemCount, pagingOptions) => {
        return pagingOptions.enabled && itemCount > pagingOptions.pageSize;
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private subscribeOrGet(value: any, callback: any) {
    if (value instanceof Observable) {
      this.subscriptions.push(value.subscribe(v => callback(v)));
    } else {
      callback(value);
    }
  }
}
