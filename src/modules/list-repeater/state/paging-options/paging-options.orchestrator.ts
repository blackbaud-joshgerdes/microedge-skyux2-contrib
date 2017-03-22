import { SkyListRepeaterStateOrchestrator, SkyListRepeaterStateDispatcher } from '../list-repeater.rxstate';
import { AsyncItem } from 'microedge-rxstate/dist';
import * as moment from 'moment';

import { SkyListRepeaterPagingOptionsModel } from '../../models';
import { PagingOptionsSetMaxPagesAction } from './set-max-pages.action';
import { PagingOptionsSetPageNumberAction } from './set-page-number.action';
import { PagingOptionsSetPageSizeAction } from './set-page-size.action';
import { PagingOptionsSetPagingEnabledAction } from './set-paging-enabled.action';

export class PagingOptionsOrchestrator extends SkyListRepeaterStateOrchestrator<SkyListRepeaterPagingOptionsModel> {
  constructor() {
    super();

    this
      .register(PagingOptionsSetMaxPagesAction, this.setMaxPages)
      .register(PagingOptionsSetPageNumberAction, this.setPageNumber)
      .register(PagingOptionsSetPageSizeAction, this.setPageSize)
      .register(PagingOptionsSetPagingEnabledAction, this.setPagingEnabled);
  }

  private setMaxPages(state, action: PagingOptionsSetMaxPagesAction): SkyListRepeaterPagingOptionsModel {
    return new SkyListRepeaterPagingOptionsModel(Object.assign({}, state, { maxPages: action.maxPages }));
  }

  private setPageNumber(state, action: PagingOptionsSetPageNumberAction): SkyListRepeaterPagingOptionsModel {
    return new SkyListRepeaterPagingOptionsModel(Object.assign({}, state, { pageNumber: action.pageNumber }));
  }

  private setPageSize(state, action: PagingOptionsSetPageSizeAction): SkyListRepeaterPagingOptionsModel {
    return new SkyListRepeaterPagingOptionsModel(Object.assign({}, state, { pageSize: action.pageSize }));
  }

  private setPagingEnabled(state, action: PagingOptionsSetPagingEnabledAction): SkyListRepeaterPagingOptionsModel {
    return new SkyListRepeaterPagingOptionsModel(Object.assign({}, state, { enabled: action.enabled }));
  }
}
