import { PagingOptionsSetMaxPagesAction } from './paging-options/set-max-pages.action';
import { PagingOptionsSetPageNumberAction } from './paging-options/set-page-number.action';
import { PagingOptionsSetPageSizeAction } from './paging-options/set-page-size.action';
import { PagingOptionsSetPagingEnabledAction } from './paging-options/set-paging-enabled.action';

export type PagingOptionsAction =
  PagingOptionsSetMaxPagesAction | PagingOptionsSetPageNumberAction |
  PagingOptionsSetPageSizeAction | PagingOptionsSetPagingEnabledAction;
