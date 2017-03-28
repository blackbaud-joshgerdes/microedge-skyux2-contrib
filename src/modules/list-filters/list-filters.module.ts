import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyModalModule } from '@blackbaud/skyux/dist/core';
import { SkyListFilterComponent } from './list-filter.component';
import { SkyListFiltersComponent } from './list-filters.component';
import { SkyListFilterRendererComponent } from './list-filter-renderer.component';
import { SkyListFiltersModalComponent } from './list-filters-modal.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyListFilterComponent,
    SkyListFiltersComponent,
    SkyListFilterRendererComponent,
    SkyListFiltersModalComponent
  ],
  imports: [
    CommonModule,
    SkyModalModule
  ],
  exports: [
    SkyListFilterComponent,
    SkyListFiltersComponent
  ],
  entryComponents: [
    SkyListFiltersModalComponent
  ]
})
export class SkyListFiltersModule {
}
