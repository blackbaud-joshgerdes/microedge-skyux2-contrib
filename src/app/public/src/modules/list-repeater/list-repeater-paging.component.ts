import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SkyListRepeaterState, SkyListRepeaterStateDispatcher,
  PagingOptionsSetPageNumberAction } from './state';

@Component({
  selector: 'sky-contrib-list-repeater-paging',
  templateUrl: './list-repeater-paging.component.html',
  styleUrls: ['./list-repeater-paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribListRepeaterPagingComponent {
  @Input() public itemCount: Observable<number>;
  public lastRunPageItems: Array<any> = [];
  public lastRunPageCount: number = 0;

  constructor(
    private state: SkyListRepeaterState,
    private dispatcher: SkyListRepeaterStateDispatcher
  ) {
  }

  get pageNumber() {
    return this.state.map(s => s.pagingOptions.pageNumber);
  }

  get pageItems() {
    return Observable.combineLatest(
      this.itemCount,
      this.state.map(s => s.pagingOptions),
      (itemCount, pagingOptions) => {
        let pageCount = Math.floor(itemCount / pagingOptions.pageSize);
        if (pageCount * pagingOptions.pageSize < itemCount) {
          pageCount += 1;
        }

        if (pageCount === this.lastRunPageCount) {
          return this.lastRunPageItems;
        }

        if (pageCount === 0) {
          return [];
        }

        let pageBounds = Math.floor((pagingOptions.maxPages - 1) / 2);
        let lowerBound = pagingOptions.pageNumber - pageBounds - 1;
        let upperBound = pagingOptions.pageNumber + pageBounds - 1;

        if (pageCount < pagingOptions.maxPages) {
          lowerBound = 0;
          upperBound = pageCount - 1;
        } else {
          if (upperBound > pageCount - 1) {
            upperBound = pageCount - 1;

            if (upperBound - lowerBound < pagingOptions.maxPages) {
              lowerBound = upperBound - pagingOptions.maxPages + 1;
            }
          } else if (lowerBound < 0) {
            lowerBound = 0;
            upperBound = pagingOptions.maxPages - 1;
          }
        }

        let pageItems: any[] = [];
        for (let i = lowerBound; i <= upperBound; i++) {
          pageItems.push({ pageNumber: i + 1, label: i + 1, isLastPage: i === itemCount });
        }

        this.lastRunPageCount = pageCount;
        this.lastRunPageItems = pageItems;
        return pageItems;
      });
  }

  get isLastPage() {
    return Observable.combineLatest(
      this.pageNumber,
      this.pageItems,
      (pageNumber, pageItems) => {
        if (pageItems.length === 0) {
          return true;
        }

        return pageItems[pageItems.length - 1].pageNumber === pageNumber;
      }
    );
  }

  public previousPage() {
    this.pageNumber
      .take(1)
      .subscribe(pageNumber => this.setPage(pageNumber === 1 ? 1 : pageNumber - 1));
  }

  public setPage(pageNumber: number) {
    this.dispatcher.next(new PagingOptionsSetPageNumberAction(pageNumber));
  }

  public nextPage() {
    Observable.combineLatest(
      this.pageNumber,
      this.isLastPage
    )
    .take(1)
    .subscribe(r => {
      let pageNumber = r[0], isLastPage = r[1];
      if (isLastPage) {
        return;
      }

      this.setPage(pageNumber + 1);
    });
  }
}
