import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribTabBarComponent } from './tabbar.component';
import { SkyContribTabBarTabComponent } from './tabbar-tab.component';

@NgModule({
  declarations: [
    SkyContribTabBarComponent,
    SkyContribTabBarTabComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyContribTabBarComponent,
    SkyContribTabBarTabComponent
  ]
})
export class SkyContribTabbarModule {
}
