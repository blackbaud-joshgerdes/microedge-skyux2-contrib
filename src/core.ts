import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SkyContribChecklistModule } from './modules/checklist';
import { SkyContribNavbarModule } from './modules/navbar';
import { SkyContribPageModule } from './modules/page';
import { SkyContribTabbarModule } from './modules/tabbar';
import { SkyContribUtilsModule } from './modules/utils';
import { SkyContribVerticalTabbarModule } from './modules/vertical-tabbar';
import { SkyDraggableRepeaterModule } from './modules/draggable-repeater';
import { SkyDropdownModule } from './modules/dropdown';
import { SkyListActionBarModule } from './modules/list-action-bar';
import { SkyListFiltersModule } from './modules/list-filters';
import { SkyListModule } from './modules/list';
import { SkyListPagingModule } from './modules/list-paging';
import { SkyListRepeaterModule } from './modules/list-repeater';
import { SkyListToolbarModule } from './modules/list-toolbar';
import { SkyListViewChecklistModule } from './modules/list-view-checklist';
import { SkyListViewGridModule } from './modules/list-view-grid';
import { SkyListViewRepeaterModule } from './modules/list-view-repeater';
import { SkyLocaleCurrencyMaskModule } from './modules/locale-currency-mask';
import { SkyOmnibarModule } from './modules/omnibar';
import { SkySpinnerModule } from './modules/spinner';
import { SkyTextExpandModule } from './modules/text-expand';
import { SkyToastModule } from './modules/toast';
import { SkyTreeViewModule } from './modules/tree-view';
import { SkyWizardModule } from './modules/wizard';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    SkyContribChecklistModule,
    SkyContribNavbarModule,
    SkyContribPageModule,
    SkyContribTabbarModule,
    SkyContribUtilsModule,
    SkyContribVerticalTabbarModule,
    SkyDraggableRepeaterModule,
    SkyDropdownModule,
    SkyListActionBarModule,
    SkyListFiltersModule,
    SkyListModule,
    SkyListPagingModule,
    SkyListRepeaterModule,
    SkyListToolbarModule,
    SkyListViewChecklistModule,
    SkyListViewGridModule,
    SkyListViewRepeaterModule,
    SkyLocaleCurrencyMaskModule,
    SkyOmnibarModule,
    SkySpinnerModule,
    SkyTextExpandModule,
    SkyToastModule,
    SkyTreeViewModule,
    SkyWizardModule
  ],
  exports: [
    SkyContribChecklistModule,
    SkyContribNavbarModule,
    SkyContribPageModule,
    SkyContribTabbarModule,
    SkyContribUtilsModule,
    SkyContribVerticalTabbarModule,
    SkyDraggableRepeaterModule,
    SkyDropdownModule,
    SkyListActionBarModule,
    SkyListFiltersModule,
    SkyListModule,
    SkyListPagingModule,
    SkyListRepeaterModule,
    SkyListToolbarModule,
    SkyListViewChecklistModule,
    SkyListViewGridModule,
    SkyListViewRepeaterModule,
    SkyLocaleCurrencyMaskModule,
    SkyOmnibarModule,
    SkySpinnerModule,
    SkyTextExpandModule,
    SkyToastModule,
    SkyTreeViewModule,
    SkyWizardModule
  ]
})
export class MicroedgeSkyContribModule {
}

export * from './modules/checklist';
export * from './modules/draggable-repeater';
export * from './modules/dropdown';
export * from './modules/list';
export * from './modules/list-action-bar';
export * from './modules/list-data-provider-in-memory';
export * from './modules/list-filters';
export * from './modules/list-paging';
export * from './modules/list-repeater';
export * from './modules/list-toolbar';
export * from './modules/list-view-checklist';
export * from './modules/list-view-grid';
export * from './modules/list-view-repeater';
export * from './modules/locale-currency-mask';
export * from './modules/navbar';
export * from './modules/omnibar';
export * from './modules/page';
export * from './modules/spinner';
export * from './modules/tabbar';
export * from './modules/text-expand';
export * from './modules/toast';
export * from './modules/tree-view';
export * from './modules/utils';
export * from './modules/vertical-tabbar';
export * from './modules/wizard';
