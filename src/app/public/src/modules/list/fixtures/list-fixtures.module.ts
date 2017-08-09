import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyContribListModule } from '../';
import { SkyContribListToolbarModule } from '../../list-toolbar';
import { SkyContribListViewGridModule } from '../../list-view-grid';
import { SkyContribListFiltersModule } from '../../list-filters';
import { SkyContribListPagingModule} from '../../list-paging';

import { ListTestComponent } from './list.component.fixture';
import { ListDualTestComponent } from './list-dual.component.fixture';
import { ListEmptyTestComponent } from './list-empty.component.fixture';
import { ListPromiseTestComponent } from './list-promise.component.fixture';

@NgModule({
  declarations: [
    ListTestComponent,
    ListDualTestComponent,
    ListEmptyTestComponent,
    ListPromiseTestComponent
  ],
  imports: [
    CommonModule,
    SkyContribListModule,
    SkyContribListFiltersModule,
    SkyContribListToolbarModule,
    SkyContribListViewGridModule,
    SkyContribListPagingModule,
    FormsModule
  ],
  exports: [
    ListTestComponent,
    ListDualTestComponent,
    ListEmptyTestComponent,
    ListPromiseTestComponent
  ]
})
export class ListFixturesModule { }
