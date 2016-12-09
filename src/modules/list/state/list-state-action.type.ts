import {
  ListItemsSetLoadingAction, ListItemsLoadAction
} from './items/actions';
import { ListViewsLoadAction, ListViewsSetActiveAction } from './views/actions';
import { ListSearchSetSearchTextAction, ListSearchSetFunctionsAction } from './search/actions';
import {
  ListSortSetFieldSelectorsAction, ListSortSetAvailableAction, ListSortSetGlobalAction
} from './sort/actions';
import { ListFiltersLoadAction, ListFiltersUpdateAction } from './filters/actions';
import { ListToolbarItemsLoadAction, ListToolbarSetExistsAction } from './toolbar/actions';
import {
  ListSelectedSetLoadingAction,
  ListSelectedLoadAction,
  ListSelectedSetItemSelectedAction,
  ListSelectedSetItemsSelectedAction
} from './selected/actions';
import {
  ListPagingSetMaxPagesAction,
  ListPagingSetItemsPerPageAction,
  ListPagingSetPageCountAction,
  ListPagingSetPageNumberAction,
  ListPagingSetDisplayedPagesAction
} from './paging/actions';

export type ListStateAction =
  ListSelectedSetLoadingAction | ListSelectedLoadAction | ListSelectedSetItemSelectedAction |
  ListSelectedSetItemsSelectedAction |
  ListItemsSetLoadingAction | ListItemsLoadAction |
  ListViewsLoadAction | ListViewsSetActiveAction |
  ListSearchSetSearchTextAction | ListSearchSetFunctionsAction |
  ListSortSetFieldSelectorsAction | ListSortSetAvailableAction | ListSortSetGlobalAction |
  ListFiltersLoadAction | ListFiltersUpdateAction |
  ListToolbarItemsLoadAction | ListToolbarSetExistsAction |
  ListPagingSetMaxPagesAction | ListPagingSetItemsPerPageAction |
  ListPagingSetPageCountAction | ListPagingSetPageNumberAction |
  ListPagingSetDisplayedPagesAction;
