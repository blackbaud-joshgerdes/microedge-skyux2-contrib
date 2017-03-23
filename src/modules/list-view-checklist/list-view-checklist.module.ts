import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkyCheckboxModule } from '../checkbox';
import { SkySpinnerModule } from '../spinner';
import { SkyListViewChecklistComponent } from './list-view-checklist.component';
import { SkyListViewChecklistItemComponent } from './list-view-checklist-item.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyListViewChecklistComponent,
    SkyListViewChecklistItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyCheckboxModule,
    SkySpinnerModule
  ],
  exports: [
    SkyListViewChecklistComponent,
    SkyListViewChecklistItemComponent
  ]
})
export class SkyListViewChecklistModule {
}
