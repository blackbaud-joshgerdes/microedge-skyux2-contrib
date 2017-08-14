import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyDropdownModule } from '@blackbaud/skyux/dist/modules/dropdown';
import { SkyContribTreeViewModule } from '../';
import { TreeViewDefaultTestComponent } from './tree-view-default.component.fixture';
import { TreeViewNoDataTestComponent } from './tree-view-no-data.component.fixture';
import { TreeViewTemplatedTestComponent } from './tree-view-templated.component.fixture';
import { TreeViewCheckboxesTestComponent } from './tree-view-checkboxes.component.fixture';

@NgModule({
  declarations: [
    TreeViewDefaultTestComponent,
    TreeViewNoDataTestComponent,
    TreeViewTemplatedTestComponent,
    TreeViewCheckboxesTestComponent
  ],
  imports: [
    CommonModule,
    SkyContribTreeViewModule,
    SkyDropdownModule
  ],
  exports: [
    TreeViewDefaultTestComponent,
    TreeViewNoDataTestComponent,
    TreeViewTemplatedTestComponent,
    TreeViewCheckboxesTestComponent
  ]
})
export class TreeViewFixturesModule { }
