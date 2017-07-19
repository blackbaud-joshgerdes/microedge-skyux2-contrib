import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SkyContribAnalyticsModule } from './modules/analytics';
import { SkyContribChecklistModule } from './modules/checklist';
import { SkyContribLinkRecordsModule } from './modules/link-records';
import { SkyContribLocaleModule } from './modules/locale';
import { SkyContribNavbarModule } from './modules/navbar';
import { SkyContribContribPageModule } from './modules/page';
import { SkyContribTabbarModule } from './modules/tabbar';
import { SkyContribTranslateModule } from './modules/translation';
import { SkyContribUtilsModule } from './modules/utils';
import { SkyContribVerticalTabbarModule } from './modules/vertical-tabbar';
import { SkyContribDraggableRepeaterModule } from './modules/draggable-repeater';
import { SkyDropdownModule } from './modules/dropdown';
import { SkyContribListActionBarModule } from './modules/list-action-bar';
import { SkyContribListFiltersModule } from './modules/list-filters';
import { SkyContribListModule } from './modules/list';
import { SkyContribListPagingModule } from './modules/list-paging';
import { SkyContribListRepeaterModule } from './modules/list-repeater';
import { SkyContribListToolbarModule } from './modules/list-toolbar';
import { SkyContribListViewChecklistModule } from './modules/list-view-checklist';
import { SkyContribListViewGridModule } from './modules/list-view-grid';
import { SkyContribListViewRepeaterModule } from './modules/list-view-repeater';
import { SkyContribLocaleCurrencyMaskModule } from './modules/locale-currency-mask';
import { SkyContribOmnibarModule } from './modules/omnibar';
import { SkyContribSpinnerModule } from './modules/spinner';
import { SkyContribTextExpandModule } from './modules/text-expand';
import { SkyContribToastModule } from './modules/toast';
import { SkyContribTreeViewModule } from './modules/tree-view';
import { SkyContribWizardModule } from './modules/wizard';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    HttpModule,
    SkyContribAnalyticsModule,
    SkyContribChecklistModule,
    SkyContribLinkRecordsModule,
    SkyContribLocaleModule,
    SkyContribNavbarModule,
    SkyContribContribPageModule,
    SkyContribTabbarModule,
    SkyContribTranslateModule,
    SkyContribUtilsModule,
    SkyContribVerticalTabbarModule,
    SkyContribDraggableRepeaterModule,
    SkyDropdownModule,
    SkyContribListActionBarModule,
    SkyContribListFiltersModule,
    SkyContribListModule,
    SkyContribListPagingModule,
    SkyContribListRepeaterModule,
    SkyContribListToolbarModule,
    SkyContribListViewChecklistModule,
    SkyContribListViewGridModule,
    SkyContribListViewRepeaterModule,
    SkyContribLocaleCurrencyMaskModule,
    SkyContribOmnibarModule,
    SkyContribSpinnerModule,
    SkyContribTextExpandModule,
    SkyContribToastModule,
    SkyContribTreeViewModule,
    SkyContribWizardModule
  ],
  exports: [
    SkyContribAnalyticsModule,
    SkyContribChecklistModule,
    SkyContribLinkRecordsModule,
    SkyContribLocaleModule,
    SkyContribNavbarModule,
    SkyContribContribPageModule,
    SkyContribTabbarModule,
    SkyContribTranslateModule,
    SkyContribUtilsModule,
    SkyContribVerticalTabbarModule,
    SkyContribDraggableRepeaterModule,
    SkyDropdownModule,
    SkyContribListActionBarModule,
    SkyContribListFiltersModule,
    SkyContribListModule,
    SkyContribListPagingModule,
    SkyContribListRepeaterModule,
    SkyContribListToolbarModule,
    SkyContribListViewChecklistModule,
    SkyContribListViewGridModule,
    SkyContribListViewRepeaterModule,
    SkyContribLocaleCurrencyMaskModule,
    SkyContribOmnibarModule,
    SkyContribSpinnerModule,
    SkyContribTextExpandModule,
    SkyContribToastModule,
    SkyContribTreeViewModule,
    SkyContribWizardModule
  ]
})
export class MicroedgeSkyContribModule {
}

export * from './modules/analytics';
export * from './modules/checklist';
export * from './modules/draggable-repeater';
export * from './modules/dropdown';
export * from './modules/link-records';
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
export * from './modules/locale';
export * from './modules/locale-currency-mask';
export * from './modules/navbar';
export * from './modules/omnibar';
export * from './modules/page';
export * from './modules/spinner';
export * from './modules/tabbar';
export * from './modules/text-expand';
export * from './modules/toast';
export * from './modules/translation';
export * from './modules/tree-view';
export * from './modules/utils';
export * from './modules/vertical-tabbar';
export * from './modules/wizard';
