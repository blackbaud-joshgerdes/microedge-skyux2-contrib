import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridState } from './state';
import { SkyModalComponent } from '@blackbaud/skyux/dist/core';
import { SkyContribListComponent } from '../list';
import { ListViewGridColumnModel } from './state/columns/column.model';

@Component({
  selector: 'sky-contrib-list-view-grid-column-selector',
  templateUrl: './list-view-grid-column-selector.component.html',
  styleUrls: ['./list-view-grid-column-selector.component.scss']
})
export class SkyContribListViewGridColumnSelectorComponent {
  @Output() public columnsChanged: EventEmitter<string[]> = new EventEmitter<string[]>();
  @ViewChild(SkyModalComponent) public modal: SkyModalComponent;
  @ViewChild('list') public list: SkyContribListComponent;

  constructor(
    private gridState: GridState
  ) {
  }

  get columns(): Observable<Array<ListViewGridColumnModel>> {
    return this.gridState.map(s => s.columns.items.filter(x => x.field !== undefined));
  }

  get displayedColumns(): Observable<Array<ListViewGridColumnModel>> {
    return this.gridState.map(s => s.displayedColumns.items);
  }

  public applyChanges() {
    this.list.selectedItems
      .take(1)
      .subscribe(columns => {
        this.columnsChanged.emit(columns.map(c => c.id));
        this.modal.closeButtonClick();
      });
  }
}
