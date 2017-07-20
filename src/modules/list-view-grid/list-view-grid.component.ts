import {
  Component, Input, TemplateRef, ContentChildren, QueryList, ViewChild,
  forwardRef, ChangeDetectionStrategy, AfterContentInit, AfterViewInit
} from '@angular/core';
import { ListViewComponent } from '../list/list-view.component';
import { ListState } from '../list/state';
import { GridState, GridStateDispatcher, GridStateModel } from './state';
import { SkyContribListViewGridColumnComponent } from './list-view-grid-column.component';
import {
  SkyContribListViewGridColumnSelectorComponent
} from './list-view-grid-column-selector.component';
import { ListStateDispatcher } from '../list/state';
import { ListViewGridColumnModel } from './state/columns/column.model';
import { ListViewGridColumnsLoadAction } from './state/columns/actions';
import { ListViewDisplayedGridColumnsLoadAction } from './state/displayed-columns/actions';
import {
  ListSelectedSetItemsSelectedAction, ListSelectedSetItemSelectedAction
} from '../list/state/selected/actions';
import { ListToolbarItemModel } from '../list/state/toolbar/toolbar-item.model';
import { ListSortLabelModel } from '../list/state/sort/label.model';
import { Observable } from 'rxjs/Observable';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { SkyModalService } from '@blackbaud/skyux/dist/core';
import { getValue } from 'microedge-rxstate/dist/helpers';
import { getData } from '../list/helpers';
import { ListItemModel } from "../list/state/items/item.model";
import { ListSelectedModel } from "../list/state/selected/selected.model";

@Component({
  selector: 'sky-contrib-list-view-grid',
  templateUrl: './list-view-grid.component.html',
  styleUrls: ['./list-view-grid.component.scss'],
  providers: [
    /* tslint:disable */
    { provide: ListViewComponent, useExisting: forwardRef(() => SkyContribListViewGridComponent)},
    /* tslint:enable */
    GridState,
    GridStateDispatcher,
    GridStateModel
  ],
  viewProviders: [ DragulaService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyContribListViewGridComponent
  extends ListViewComponent implements AfterContentInit, AfterViewInit {
  @Input() set name(value: string) { this.viewName = value; }
  @Input() hiddenColumns: Array<string> | Observable<Array<string>>;
  @Input() displayedColumns: Array<string> | Observable<Array<string>>;
  @Input() fit: string = 'width';
  @Input() width: number | Observable<number>;
  @Input() height: number | Observable<number>;
  @Input() selectionEnabled: boolean | Observable<boolean>;

  /* tslint:disable */
  @Input('search') searchFunction: (data: any, searchText: string) => boolean;
  @ViewChild('chooseColumnsTemplate') chooseColumnsTemplate: TemplateRef<any>;
  /* tslint:enable */

  @ContentChildren(SkyContribListViewGridColumnComponent)
  columnComponents: QueryList<SkyContribListViewGridColumnComponent>;

  constructor(
    state: ListState,
    private dispatcher: ListStateDispatcher,
    private gridState: GridState,
    private gridDispatcher: GridStateDispatcher,
    private modalService: SkyModalService,
    private dragulaService: DragulaService
  ) {
    super(state, 'Grid View');
  }

  public ngAfterContentInit() {
    if (this.columnComponents.length === 0) {
      throw new Error('Grid view requires at least one sky-contrib-list-view-grid-column to render.');
    }

    let columnModels = this.columnComponents.map(columnComponent => {
      return new ListViewGridColumnModel(
        columnComponent.template, columnComponent.headingTemplate, columnComponent);
    });

    if (this.selectionEnabled && !(this.selectionEnabled instanceof Observable)) {
      this.selectionEnabled = Observable.of(this.selectionEnabled);
    }

    if (this.width && !(this.width instanceof Observable)) {
      this.width = Observable.of(this.width);
    }

    if (this.height && !(this.height instanceof Observable)) {
      this.height = Observable.of(this.height);
    }

    this.gridState.map(s => s.columns.items)
      .distinctUntilChanged()
      .subscribe(columns => {
        if (this.hiddenColumns) {
          getValue(this.hiddenColumns, (hiddenColumns: string[]) => {
            this.gridDispatcher.next(
              new ListViewDisplayedGridColumnsLoadAction(
                columns.filter(x => hiddenColumns.indexOf(x.id || x.field) === -1)
              )
            );
          });
        } else if (this.displayedColumns) {
          getValue(this.displayedColumns, (displayedColumns: string[]) => {
            this.gridDispatcher.next(
              new ListViewDisplayedGridColumnsLoadAction(
                columns.filter(x => displayedColumns.indexOf(x.id || x.field) !== -1)
              )
            );
          });
        } else {
          this.gridDispatcher.next(
            new ListViewDisplayedGridColumnsLoadAction(columns.filter(x => !x.hidden))
          );
        }
      });

    this.gridDispatcher.next(new ListViewGridColumnsLoadAction(columnModels, true));

    /* tslint:disable */
    /* istanbul ignore next */
    this.dragulaService.drag.subscribe(([, el]: any) =>
      el.classList.add('dragging')
    );

    /* istanbul ignore next */
    this.dragulaService.dragend.subscribe(([, el]: any) =>
      el.classList.remove('dragging')
    );

    /* istanbul ignore next */
    this.dragulaService.drop.subscribe(([,, container]: any) => {
      let columnIds: string[] = [];
      let nodes = container.getElementsByTagName('th');
      for (let i = 0; i < nodes.length; i++) {
        let el = nodes[i];
        let id = el.getAttribute('cmp-id');
        columnIds.push(id);
      }

      this.gridState.map(s => s.columns.items)
        .take(1)
        .subscribe(columns => {
          let displayedColumns = columnIds.map(
            columnId => columns.filter(c => c.id === columnId)[0]
          );
          this.gridDispatcher.next(
            new ListViewDisplayedGridColumnsLoadAction(displayedColumns, true)
          );
        });
    });

    /* istanbul ignore next */
    this.dragulaService.setOptions('heading', {
      moves: (el: any) => !el.classList.contains('locked'),
      accepts: ([,,, sibling]: any) => sibling === undefined
        || !sibling.classList.contains('locked')
    });
    /* tslint:enable */
  }

  public ngAfterViewInit() {
    this.dispatcher.toolbarAddItems([
      new ListToolbarItemModel(
        {
          id: 'column-selector',
          template: this.chooseColumnsTemplate,
          location: 'center',
          index: 0,
          view: this.id
        }
      )
    ]);
  }

  public onViewActive() {
    let sub = this.gridState.map(s => s.displayedColumns.items)
      .distinctUntilChanged()
      .subscribe(displayedColumns => {
        let setFunctions =
          this.searchFunction !== undefined ? [this.searchFunction] :
          displayedColumns
            .map(cmp => (data: any, searchText: string) =>
              cmp.searchFunction(getData(data, cmp.field), searchText)
            )
            .filter(c => c !== undefined);

        this.dispatcher.searchSetFieldSelectors(displayedColumns.map(d => d.field));
        this.dispatcher.searchSetFunctions(setFunctions);
        this.dispatcher.sortSetAvailable(displayedColumns.filter(c => c.field != null).map(cmp =>
          new ListSortLabelModel({ text: cmp.heading, fieldSelector: cmp.field })
        ));
      });

    this.subscriptions.push(sub);
  }

  get items() {
    return Observable.combineLatest(
      this.state.map(s => s.items.items).distinctUntilChanged(),
      this.state.map(s => s.selected.item).distinctUntilChanged(),
      (items, selected) => items
    );
  }

  get columns() {
    return this.gridState.map(s => s.displayedColumns.items)
      .distinctUntilChanged();
  }

  public getSortDirection(sortField: string) {
    return this.state.map(s => s.sort)
      .distinctUntilChanged()
      .map(sort => sort.fieldSelectors.filter(f => f.fieldSelector === sortField)[0])
      .map(field => field ? (field.descending ? 'desc' : 'asc') : undefined);
  }

  public sortByColumn(column: any) {
    this.state
      .map(s => s.sort.fieldSelectors.filter(f => f.fieldSelector === column.field)[0])
      .take(1)
      .subscribe(field => {
        if (field) {
          this.dispatcher.sortSetFieldSelectors(
            [`${field.fieldSelector}:${field.descending ? 'ASC' : 'DESC'}`]
          );
        } else if (column.field) {
          this.dispatcher.sortSetFieldSelectors([`${column.field}:DESC`]);
        }
      });
  }

  public openColumnSelector() {
    let providers = [
      { provide: GridState, useValue: this.gridState },
      { provide: GridStateDispatcher, useValue: this.gridDispatcher }
    ];

    let modalInstance = this.modalService.open(SkyContribListViewGridColumnSelectorComponent, providers);
    modalInstance.componentInstance.columnsChanged.subscribe((columnIds: string[]) => {
      this.gridState.map(s => s.columns.items)
        .take(1)
        .subscribe(columns => {
          let displayed: Array<ListViewGridColumnModel> = [];
          columns.forEach(column => {
            if ( column.field == null) {
              displayed.push(column);
            } else if (columnIds.find(id => id === column.id)) {
              displayed.push(column);
            }
          });

          this.gridDispatcher.next(new ListViewDisplayedGridColumnsLoadAction(displayed, true));
        });
    });
  }

  private get loading() {
    return this.state.map(s => s.items.loading)
      .distinctUntilChanged();
  }

  public toggleSelectAllDisplayed(event: any) {
    this.items
      .take(1)
      .subscribe((items: any) => {
        this.dispatcher.next(
          new ListSelectedSetItemsSelectedAction(event.checked ? items : [])
        );
      });
  }

  public toggleSelected(event: any, item: any) {
    this.dispatcher.next(new ListSelectedSetItemSelectedAction(item, event.checked));
  }

  public isSelected(id: string): Observable<boolean> {
    return this.state.map(s => {
      return s.selected.item[id] != null;
    }).distinctUntilChanged();
  }

  public isAllDisplayedSelected(): Observable<boolean> {
    return Observable.combineLatest(
      this.items.distinctUntilChanged(),
      this.state.map(s => s.selected.item).distinctUntilChanged(),
      (items: Array<ListItemModel>, selected: ListSelectedModel) =>
        items.every((i: ListItemModel) => selected[i.id] != null)
    ).distinctUntilChanged();
  }
}
