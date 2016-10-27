import { AsyncList } from 'microedge-rxstate/dist';
import { ListViewsModel } from './views/views.model';
import { ListItemModel } from './items/item.model';
import { ListSortModel } from './sort/sort.model';
import { ListSearchModel } from './search/search.model';
import { ListFilterModel } from './filters/filter.model';
import { ListToolbarModel } from './toolbar/toolbar.model';

export class ListStateModel {
  public views: ListViewsModel = new ListViewsModel();
  public search: ListSearchModel = new ListSearchModel();
  public items: AsyncList<ListItemModel> = new AsyncList<ListItemModel>();
  public displayedItems: AsyncList<ListItemModel> = new AsyncList<ListItemModel>();
  public sort: ListSortModel = new ListSortModel();
  public filters: ListFilterModel[] = [];
  public toolbar: ListToolbarModel = new ListToolbarModel();

  constructor(data?: any) {
    if (data) {
      this.views = data.views;
      this.search = data.search;
      this.items = data.items;
      this.displayedItems = data.displayedItems;
      this.sort = data.sort;
      this.filters = data.filters;
      this.toolbar = data.toolbar;
    }
  }
}
