import { AsyncList } from 'microedge-rxstate';
import { ListViewChecklistItemModel } from './items/item.model';

export class ChecklistStateModel {
  public items: AsyncList<ListViewChecklistItemModel> = new AsyncList<ListViewChecklistItemModel>();
}
