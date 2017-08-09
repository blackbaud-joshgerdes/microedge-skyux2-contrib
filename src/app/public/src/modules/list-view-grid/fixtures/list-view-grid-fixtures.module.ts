import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyContribListViewGridModule } from '../';
import { SkyContribListToolbarModule } from '../../list-toolbar';

import { ListFixturesModule } from '../../list/fixtures/list-fixtures.module';
import { ListViewGridTestComponent } from './list-view-grid.component.fixture';
import { ListViewGridDisplayTestComponent } from './list-view-grid-display.component.fixture';
import { ListViewGridEmptyTestComponent } from './list-view-grid-empty.component.fixture';

@NgModule({
  declarations: [
    ListViewGridTestComponent,
    ListViewGridDisplayTestComponent,
    ListViewGridEmptyTestComponent
  ],
  imports: [
    CommonModule,
    SkyContribListViewGridModule,
    SkyContribListToolbarModule,
    ListFixturesModule
  ],
  exports: [
    ListViewGridTestComponent,
    ListViewGridDisplayTestComponent,
    ListViewGridEmptyTestComponent
  ]
})
export class ListViewGridFixturesModule { }
