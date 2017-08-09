import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyDropdownModule } from '../dropdown';
import { SkyContribListToolbarComponent } from './list-toolbar.component';
import { SkyContribListToolbarItemComponent } from './list-toolbar-item.component';
import { SkyContribListToolbarItemRendererComponent } from './list-toolbar-item-renderer.component';
import { SkyContribListToolbarSortComponent } from './list-toolbar-sort.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribListToolbarComponent,
    SkyContribListToolbarItemComponent,
    SkyContribListToolbarItemRendererComponent,
    SkyContribListToolbarSortComponent
  ],
  imports: [
    CommonModule,
    SkyDropdownModule
  ],
  exports: [
    SkyContribListToolbarComponent,
    SkyContribListToolbarItemComponent,
    SkyContribListToolbarItemRendererComponent,
    SkyContribListToolbarSortComponent
  ],
  providers: [
  ]
})
export class SkyContribListToolbarModule {
}
