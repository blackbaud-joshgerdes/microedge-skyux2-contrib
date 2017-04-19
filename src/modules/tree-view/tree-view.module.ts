import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyTreeViewComponent } from './tree-view.component';
import { SkyTreeViewNodeComponent } from './tree-view-node.component';
import { SkyCheckboxModule } from '../checkbox';
import { SkyTreeViewContentComponent } from './tree-view-content.component';
import { SkyTreeViewDropdownComponent } from './tree-view-dropdown.component';
import { SkyTreeViewRendererComponent } from './tree-view-renderer.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyTreeViewComponent,
    SkyTreeViewNodeComponent,
    SkyTreeViewContentComponent,
    SkyTreeViewDropdownComponent,
    SkyTreeViewRendererComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule
  ],
  exports: [
    SkyTreeViewComponent,
    SkyTreeViewNodeComponent,
    SkyTreeViewContentComponent,
    SkyTreeViewDropdownComponent,
    SkyTreeViewRendererComponent
  ]
})
export class SkyTreeViewModule {
}
