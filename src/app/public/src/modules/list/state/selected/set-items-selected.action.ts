import { ListItemModel } from '../items/item.model';

export class ListSelectedSetItemsSelectedAction {
  constructor(public items: Array<ListItemModel>,
    public selected: boolean = true, public refresh: boolean = true) {}
}
