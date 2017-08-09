import { ListItemModel } from '../items/item.model';

export class ListSelectedSetItemSelectedAction {
  constructor(public item: ListItemModel, public selected: boolean = true) {}
}
