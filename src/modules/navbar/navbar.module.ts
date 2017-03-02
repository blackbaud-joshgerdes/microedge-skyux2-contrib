import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribNavbarComponent } from './navbar.component';
import { SkyContribNavbarItemComponent } from './navbar-item.component';
import { SkyContribNavbarSubmenuComponent } from './navbar-submenu.component';

@NgModule({
  declarations: [
    SkyContribNavbarComponent,
    SkyContribNavbarItemComponent,
    SkyContribNavbarSubmenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyContribNavbarComponent,
    SkyContribNavbarItemComponent,
    SkyContribNavbarSubmenuComponent
  ]
})
export class SkyContribNavbarModule {
}
