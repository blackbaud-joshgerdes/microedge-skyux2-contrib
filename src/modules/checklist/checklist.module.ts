import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkyChecklistComponent } from './checklist.component';
import { SkyChecklistDataFilterPipe } from './checklist-filter.pipe';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SkyChecklistComponent,
    SkyChecklistDataFilterPipe
  ],
  exports: [
    SkyChecklistComponent,
    SkyChecklistDataFilterPipe
  ]
})
export class SkyContribChecklistModule {}
