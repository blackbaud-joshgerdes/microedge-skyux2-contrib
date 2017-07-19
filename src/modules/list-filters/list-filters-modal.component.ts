import { Component, ViewChild, Inject } from '@angular/core';
import { ListState, ListStateDispatcher } from '../list/state';
import { SkyModalComponent } from '@blackbaud/skyux/dist/core';
import { ListFilterModel } from '../list/state/filters/filter.model';
import { ListFilterDataModel } from '../list/state/filters/filter-data.model';

@Component({
  selector: 'sky-contrib-list-filters-modal',
  templateUrl: './list-filters-modal.component.html',
  styleUrls: ['./list-filters-modal.component.scss']
})
export class SkyContribListFiltersModalComponent {
  @ViewChild(SkyModalComponent) modal: SkyModalComponent;
  title: string;
  private filters: Array<any> = [];

  constructor(
    @Inject('title') title: string,
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {
    this.title = (title) ? title.trim() : '';
    this.state.map(s => s.filters)
      .take(1)
      .subscribe(filters => this.filters = filters.map(f => {
        let r = new ListFilterModel(f);
        r.filterModel = new ListFilterDataModel(r.filterModel);
        return r;
      }));
  }

  get modalFilters() {
    return this.filters.filter(f => f.type !== 'inline');
  }

  public applyFilters() {
    this.dispatcher.filtersUpdate(this.filters);
    this.modal.closeButtonClick();
  }

  public clearFilters() {
    this.filters.forEach(f => f.type !== 'inline' ? f.filterModel.value = '' : undefined);
  }

  public isValid() {
    let valid = true;

    for (let filter of this.modalFilters) {
      if (!filter.validator()) {
        valid = false;
        break;
      }
    }

    return valid;
  }
}
