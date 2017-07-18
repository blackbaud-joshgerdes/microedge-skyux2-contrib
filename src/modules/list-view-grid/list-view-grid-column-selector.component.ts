import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { GridState, GridStateDispatcher } from './state';
import { SkyModalComponent } from '@blackbaud/skyux/dist/core';
import { SkyContribListComponent } from '../list';

@Component({
  selector: 'sky-contrib-list-view-grid-column-selector',
  templateUrl: './list-view-grid-column-selector.component.html',
  styleUrls: ['./list-view-grid-column-selector.component.scss']
})
export class SkyContribListViewGridColumnSelectorComponent {
  @Output() columnsChanged: EventEmitter<string[]> = new EventEmitter<string[]>();
  @ViewChild(SkyModalComponent) modal: SkyModalComponent;
  @ViewChild('list') list: SkyContribListComponent;

  constructor(
    private gridState: GridState,
    private gridDispatcher: GridStateDispatcher
  ) {
  }

  get columns() {
    return this.gridState.map(s => s.columns.items.filter(x => x.field != null));
  }

  get displayedColumnIds() {
    return this.gridState.map(s => s.displayedColumns.items.map(c => c.id));
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
