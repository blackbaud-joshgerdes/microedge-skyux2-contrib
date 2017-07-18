import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyModalModule } from '@blackbaud/skyux/dist/core';
import { SkyContribSpinnerModule } from '../spinner';
import { SkyCheckboxModule } from '../checkbox';
import { SkyContribListModule } from '../list';
import { SkyContribListViewChecklistModule } from '../list-view-checklist';
import { SkyContribListViewGridComponent } from './list-view-grid.component';
import { SkyContribListViewGridColumnComponent } from './list-view-grid-column.component';
import { SkyContribListViewGridCellComponent } from './list-view-grid-cell.component';
import { SkyContribListViewGridColumnSelectorComponent }
  from './list-view-grid-column-selector.component';
import { SkyContribListPagingModule } from '../list-paging';
import { SkyContribListToolbarModule } from '../list-toolbar';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribListViewGridComponent,
    SkyContribListViewGridColumnComponent,
    SkyContribListViewGridCellComponent,
    SkyContribListViewGridColumnSelectorComponent
  ],
  imports: [
    CommonModule,
    SkyContribSpinnerModule,
    SkyCheckboxModule,
    SkyModalModule,
    SkyContribListModule,
    SkyContribListViewChecklistModule,
    SkyContribListPagingModule,
    SkyContribListToolbarModule,
    DragulaModule
  ],
  entryComponents: [
    SkyContribListViewGridColumnSelectorComponent
  ],
  exports: [
    SkyContribListViewGridComponent,
    SkyContribListViewGridColumnComponent,
    SkyContribListViewGridCellComponent
  ]
})
export class SkyContribListViewGridModule {
}
