import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SkyListModule } from './list';
import { SkyListActionBarModule } from './list-action-bar';
import { SkyListToolbarModule } from './list-toolbar';
import { SkyListFiltersModule } from './list-filters';
import { SkyListViewGridModule } from './list-view-grid';
import { SkyListViewRepeaterModule } from './list-view-repeater';
import { SkyListViewChecklistModule } from './list-view-checklist';
import { SkyListPagingModule } from './list-paging';
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
    SkyListPagingModule,
    SkyListActionBarModule
  ],
  exports: [
    SkySpinnerModule,
    SkyListModule,
    SkyListToolbarModule,
    SkyListFiltersModule,
    SkyListViewGridModule,
    SkyListViewRepeaterModule,
    SkyListViewChecklistModule,
    SkyListPagingModule,
    SkyListActionBarModule
  ]
})
export class MicroedgeSkyContribModule {
}

export * from './list';
export * from './list-action-bar';
export * from './list-toolbar';
export * from './list-filters';
export * from './list-view-grid';
export * from './list-view-repeater';
export * from './list-view-checklist';
export * from './list-paging';
export * from './spinner';
export * from './list-data-provider-in-memory';
