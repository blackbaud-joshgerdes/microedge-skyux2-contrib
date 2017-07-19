import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkyContribChecklistComponent } from './checklist.component';
import { SkyChecklistDataFilterPipe } from './checklist-filter.pipe';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SkyContribChecklistComponent,
    SkyChecklistDataFilterPipe
  ],
  exports: [
    SkyContribChecklistComponent,
    SkyChecklistDataFilterPipe
  ]
})
export class SkyContribChecklistModule {}
