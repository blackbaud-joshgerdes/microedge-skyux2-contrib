import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribTreeViewComponent } from './tree-view.component';
import { SkyContribTreeViewNodeComponent } from './tree-view-node.component';
import { SkyCheckboxModule } from '@blackbaud/skyux/dist/modules/checkbox';
import { SkyContribTreeViewContentComponent } from './tree-view-content.component';
import { SkyContribTreeViewDropdownComponent } from './tree-view-dropdown.component';
import { SkyContribTreeViewRendererComponent } from './tree-view-renderer.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribTreeViewComponent,
    SkyContribTreeViewNodeComponent,
    SkyContribTreeViewContentComponent,
    SkyContribTreeViewDropdownComponent,
    SkyContribTreeViewRendererComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule
  ],
  exports: [
    SkyContribTreeViewComponent,
    SkyContribTreeViewNodeComponent,
    SkyContribTreeViewContentComponent,
    SkyContribTreeViewDropdownComponent,
    SkyContribTreeViewRendererComponent
  ]
})
export class SkyContribTreeViewModule {
}
