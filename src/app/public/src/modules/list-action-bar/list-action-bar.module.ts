import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribListActionBarComponent } from './list-action-bar.component';
import { SkyContribListActionBarItemComponent } from './list-action-bar-item.component';

@NgModule({
  declarations: [
    SkyContribListActionBarComponent,
    SkyContribListActionBarItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyContribListActionBarComponent,
    SkyContribListActionBarItemComponent
  ]
})
export class SkyContribListActionBarModule {
}
