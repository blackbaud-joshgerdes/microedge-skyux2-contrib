import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SkyListModule } from './list';
import { SkyListToolbarModule } from './list-toolbar';
import { SkyListFiltersModule } from './list-filters';
import { SkyListViewGridModule } from './list-view-grid';
import { SkyListViewRepeaterModule } from './list-view-repeater';
import { SkyListViewChecklistModule } from './list-view-checklist';
import { SkyListPagingDefaultModule } from './list-paging-default';
import { SkySpinnerModule } from './spinner';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    SkySpinnerModule,
    SkyListModule,
    SkyListToolbarModule,
    SkyListFiltersModule,
    SkyListViewGridModule,
    SkyListViewRepeaterModule,
    SkyListViewChecklistModule,
    SkyListPagingDefaultModule
  ],
  exports: [
    SkySpinnerModule,
    SkyListModule,
    SkyListToolbarModule,
    SkyListFiltersModule,
    SkyListViewGridModule,
    SkyListViewRepeaterModule,
    SkyListViewChecklistModule,
    SkyListPagingDefaultModule
  ]
})
export class MicroedgeSkyContribModule {
}

export * from './list';
export * from './list-toolbar';
export * from './list-filters';
export * from './list-view-grid';
export * from './list-view-repeater';
export * from './list-view-checklist';
export * from './list-paging-default';
export * from './spinner';
