import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyModalModule } from '@blackbaud/skyux/dist/core';
import { SkyContribListFilterComponent } from './list-filter.component';
import { SkyContribListFiltersComponent } from './list-filters.component';
import { SkyContribListFilterRendererComponent } from './list-filter-renderer.component';
import { SkyContribListFiltersModalComponent } from './list-filters-modal.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribListFilterComponent,
    SkyContribListFiltersComponent,
    SkyContribListFilterRendererComponent,
    SkyContribListFiltersModalComponent
  ],
  imports: [
    CommonModule,
    SkyModalModule
  ],
  exports: [
    SkyContribListFilterComponent,
    SkyContribListFiltersComponent
  ],
  entryComponents: [
    SkyContribListFiltersModalComponent
  ]
})
export class SkyContribListFiltersModule {
}
