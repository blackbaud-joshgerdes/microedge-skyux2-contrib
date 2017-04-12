import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribVerticalTabbarComponent } from './vertical-tabbar.component';
import { SkyContribVerticalTabbarItemComponent } from './vertical-tabbar-item.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribVerticalTabbarComponent,
    SkyContribVerticalTabbarItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyContribVerticalTabbarComponent,
    SkyContribVerticalTabbarItemComponent
  ]
})
export class SkyContribVerticalTabbarModule {
}
