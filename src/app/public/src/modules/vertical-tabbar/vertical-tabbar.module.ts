import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribVerticalTabbarComponent } from './vertical-tabbar.component';
import { SkyContribVerticalTabbarItemComponent } from './vertical-tabbar-item.component';

@NgModule({
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
