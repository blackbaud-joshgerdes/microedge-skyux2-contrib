import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SkyContribUtilsModule } from './utils';
import { SkyContribChecklistModule } from './checklist';
import { SkyContribNavbarModule } from './navbar';
import { SkyContribPageModule } from './page';
import { SkyContribTabbarModule } from './tabbar';
import { SkyDraggableRepeaterModule } from './draggable-repeater';
import { SkyListActionBarModule } from './list-action-bar';
import { SkyListFiltersModule } from './list-filters';
import { SkyListModule } from './list';
import { SkyListPagingModule } from './list-paging';
import { SkyListRepeaterModule } from './list-repeater';
import { SkyListToolbarModule } from './list-toolbar';
import { SkyListViewChecklistModule } from './list-view-checklist';
import { SkyListViewGridModule } from './list-view-grid';
import { SkyListViewRepeaterModule } from './list-view-repeater';
import { SkyOmnibarModule } from './omnibar';
import { SkySpinnerModule } from './spinner';
import { SkyTextExpandModule } from './text-expand';
import { SkyToastModule } from './toast';
import { SkyWizardModule } from './wizard';
import { SkyLocaleCurrencyMaskModule } from './locale-currency-mask';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    SkyContribUtilsModule,
    SkyContribChecklistModule,
    SkyContribNavbarModule,
    SkyContribPageModule,
    SkyContribTabbarModule,
    SkyDraggableRepeaterModule,
    SkyListActionBarModule,
    SkyListFiltersModule,
    SkyListModule,
    SkyListPagingModule,
    SkyListRepeaterModule,
    SkyListToolbarModule,
    SkyListViewChecklistModule,
    SkyListViewGridModule,
    SkyListViewRepeaterModule,
    SkyOmnibarModule,
    SkySpinnerModule,
    SkyTextExpandModule,
    SkyToastModule,
    SkyWizardModule,
    SkyLocaleCurrencyMaskModule
  ],
  exports: [
    SkyContribUtilsModule,
    SkyContribChecklistModule,
    SkyContribNavbarModule,
    SkyContribPageModule,
    SkyContribTabbarModule,
    SkyDraggableRepeaterModule,
    SkyListActionBarModule,
    SkyListFiltersModule,
    SkyListModule,
    SkyListPagingModule,
    SkyListRepeaterModule,
    SkyListToolbarModule,
    SkyListViewChecklistModule,
    SkyListViewGridModule,
    SkyListViewRepeaterModule,
    SkyOmnibarModule,
    SkySpinnerModule,
    SkyTextExpandModule,
    SkyToastModule,
    SkyWizardModule,
    SkyLocaleCurrencyMaskModule
  ]
})
export class MicroedgeSkyContribModule {
}

export * from './checklist';
export * from './draggable-repeater';
export * from './list';
export * from './list-action-bar';
export * from './list-data-provider-in-memory';
export * from './list-filters';
export * from './list-paging';
export * from './list-repeater';
export * from './list-toolbar';
export * from './list-view-checklist';
export * from './list-view-grid';
export * from './list-view-repeater';
export * from './navbar';
export * from './omnibar';
export * from './page';
export * from './spinner';
export * from './tabbar';
export * from './text-expand';
export * from './toast';
export * from './wizard';
export * from './utils';
export * from './locale-currency-mask';
