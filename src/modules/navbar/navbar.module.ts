import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribNavbarComponent } from './navbar.component';
import { SkyContribNavbarItemComponent } from './navbar-item.component';
import { SkyContribNavbarSubmenuComponent } from './navbar-submenu.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
