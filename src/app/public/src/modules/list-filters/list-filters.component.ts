import {
    Component,
    Input,
    ContentChildren,
    QueryList,
    ViewChild,
    TemplateRef,
    AfterContentInit,
    AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SkyModalService } from '@blackbaud/skyux/dist/core';
import { SkyContribListFilterComponent } from './list-filter.component';
import { ListState, ListStateDispatcher } from '../list/state';
import { ListToolbarItemModel } from '../list/state/toolbar/toolbar-item.model';
import { ListFilterModel } from '../list/state/filters/filter.model';
import { ListFilterDataModel } from '../list/state/filters/filter-data.model';
import { SkyContribListFiltersModalComponent } from './list-filters-modal.component';
import { getValue } from 'microedge-rxstate/dist/helpers';

@Component({
  selector: 'sky-contrib-list-filters',
  templateUrl: './list-filters.component.html',
  styleUrls: ['./list-filters.component.scss']
})
export class SkyContribListFiltersComponent implements AfterContentInit, AfterViewInit {
  @Input() public modalTitle: string = 'Filters';
  @ContentChildren(SkyContribListFilterComponent)
    public filters: QueryList<SkyContribListFilterComponent>;
  @ViewChild('filterButton') public filterButtonTemplate: TemplateRef<any>;
  public inlineBarExpanded: boolean = false;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private modalService: SkyModalService
  ) {
  }

  public ngAfterContentInit() {
    let filterModels = this.filters.map(cmp =>
      new ListFilterModel(cmp, cmp.view !== undefined ? cmp.view.id : undefined)
    );

    filterModels.forEach(f => {
      /* tslint:disable */
      f.type === 'inline' ?
        f.filterModel.onChange.subscribe(() => this.applyFilters()) : undefined;
      /* tslint:enable */

      getValue(f.defaultValue, (value: any) => {
        if (value) {
          f.filterModel.value = value;

          if (f.type === 'inline') {
            this.inlineBarExpanded = true;
          }
        }
      });
    });

    this.dispatcher.filtersLoad(filterModels);
  }

  public ngAfterViewInit() {
    this.dispatcher.toolbarAddItems([
      new ListToolbarItemModel({ template: this.filterButtonTemplate, location: 'right' })
    ]);
  }

  public applyFilters() {
    this.state.map(s => s.filters)
      .take(1)
      .subscribe(filters => this.dispatcher.filtersUpdate(filters));
  }

  public openFiltersModal() {
    let providers = [
      { provide: ListState, useValue: this.state },
      { provide: ListStateDispatcher, useValue: this.dispatcher },
      { provide: 'title', useValue: this.modalTitle }
    ];

    this.modalService.open(SkyContribListFiltersModalComponent, providers);
  }

  public filterButtonClick() {
    this.inlineFilters
      .take(1)
      .subscribe(filters => {
        if (filters.length > 0) {
          this.inlineBarExpanded = !this.inlineBarExpanded;
        } else {
          this.openFiltersModal();
        }
      });
  }

  public clearFilter(filterId: string) {
    this.state.map(s => s.filters)
      .take(1)
      .subscribe(filters => {
        let updatedFilters: ListFilterModel[] = [];
        filters.forEach((f) => {
          let model = new ListFilterModel(f, f.view);
          model.filterModel = new ListFilterDataModel(f.filterModel);
          model.filterModel.value = (model.filterModel.id === filterId) ?
            '' : model.filterModel.value;
          updatedFilters.push(model);
        });

        this.dispatcher.filtersUpdate(updatedFilters);
      });
  }

  get inlineFilters(): Observable<Array<ListFilterModel>> {
    return this.state.map(s => s.filters.filter(f => f.type === 'inline'))
      .distinctUntilChanged();
  }

  get modalFilters(): Observable<Array<ListFilterModel>> {
    return this.state.map(s => s.filters.filter(f => f.type !== 'inline'))
      .distinctUntilChanged();
  }

  get activeModalFilters(): Observable<Array<ListFilterModel>> {
    return this.modalFilters.map(s =>
        /* tslint:disable-next-line */
        s.filter(f => f.filterModel.value != '' && f.filterModel.value != null)
    );
  }

  get filtered(): Observable<boolean> {
    return this.state.map(s =>
        /* tslint:disable-next-line */
        s.filters.filter(f => f.filterModel.value != '' && f.filterModel.value != null).length > 0
      );
  }
}
