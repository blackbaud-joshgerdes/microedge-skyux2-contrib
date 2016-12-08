import { ListItemModel } from './state/items/item.model';
import { ListDataRequestModel } from './list-data-request.model';
import { Observable } from 'rxjs';

export abstract class ListDataProvider {
  constructor(data?: Observable<Array<any>>) {}

  public abstract get(request: ListDataRequestModel): Observable<Array<ListItemModel>>;

  public abstract count(): Observable<number>;
}
