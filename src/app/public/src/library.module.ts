import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SkyContribAnalyticsModule } from './modules/analytics';
import { SkyContribContribPageModule } from './modules/page';
import { SkyContribDraggableRepeaterModule } from './modules/draggable-repeater';
import { SkyContribListActionBarModule } from './modules/list-action-bar';
import { SkyContribListFiltersModule } from './modules/list-filters';
import { SkyContribListModule } from './modules/list';
import { SkyContribListPagingModule } from './modules/list-paging';
import { SkyContribListToolbarModule } from './modules/list-toolbar';
import { SkyContribListViewChecklistModule } from './modules/list-view-checklist';
import { SkyContribListViewGridModule } from './modules/list-view-grid';
import { SkyContribListViewRepeaterModule } from './modules/list-view-repeater';
import { SkyContribLocaleCurrencyMaskModule } from './modules/locale-currency-mask';
import { SkyContribLocaleModule } from './modules/locale';
import { SkyContribSharedModule } from './modules/shared';
import { SkyContribTextExpandModule } from './modules/text-expand';
import { SkyContribToastModule } from './modules/toast';
import { SkyContribTranslateModule } from './modules/translation';
import { SkyContribTreeViewModule } from './modules/tree-view';
import { SkyContribUtilsModule } from './modules/utils';
import { SkyContribVerticalTabbarModule } from './modules/vertical-tabbar';
import { SkyContribWizardModule } from './modules/wizard';

export * from './modules/analytics';
export * from './modules/draggable-repeater';
export * from './modules/list';
export * from './modules/list-action-bar';
export * from './modules/list-data-provider-in-memory';
export * from './modules/list-filters';
export * from './modules/list-paging';
export * from './modules/list-toolbar';
export * from './modules/list-view-checklist';
export * from './modules/list-view-grid';
export * from './modules/list-view-repeater';
export * from './modules/locale';
export * from './modules/locale-currency-mask';
export * from './modules/page';
export * from './modules/shared';
export * from './modules/text-expand';
export * from './modules/toast';
export * from './modules/translation';
export * from './modules/tree-view';
export * from './modules/utils';
export * from './modules/vertical-tabbar';
export * from './modules/wizard';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    HttpModule,
    SkyContribAnalyticsModule,
    SkyContribContribPageModule,
    SkyContribDraggableRepeaterModule,
    SkyContribListActionBarModule,
    SkyContribListFiltersModule,
    SkyContribListModule,
    SkyContribListPagingModule,
    SkyContribListToolbarModule,
    SkyContribListViewChecklistModule,
    SkyContribListViewGridModule,
    SkyContribListViewRepeaterModule,
    SkyContribLocaleCurrencyMaskModule,
    SkyContribLocaleModule,
    SkyContribSharedModule,
    SkyContribTextExpandModule,
    SkyContribToastModule,
    SkyContribTranslateModule,
    SkyContribTreeViewModule,
    SkyContribUtilsModule,
    SkyContribVerticalTabbarModule,
    SkyContribWizardModule
  ],
  exports: [
    SkyContribAnalyticsModule,
    SkyContribContribPageModule,
    SkyContribDraggableRepeaterModule,
    SkyContribListActionBarModule,
    SkyContribListFiltersModule,
    SkyContribListModule,
    SkyContribListPagingModule,
    SkyContribListToolbarModule,
    SkyContribListViewChecklistModule,
    SkyContribListViewGridModule,
    SkyContribListViewRepeaterModule,
    SkyContribLocaleCurrencyMaskModule,
    SkyContribLocaleModule,
    SkyContribSharedModule,
    SkyContribTextExpandModule,
    SkyContribToastModule,
    SkyContribTranslateModule,
    SkyContribTreeViewModule,
    SkyContribUtilsModule,
    SkyContribVerticalTabbarModule,
    SkyContribWizardModule
  ]
})
export class MicroedgeSkyContribModule { }
