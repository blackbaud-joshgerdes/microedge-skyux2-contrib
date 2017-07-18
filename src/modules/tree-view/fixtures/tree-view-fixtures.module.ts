import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyContribTreeViewModule } from '../';
import { SkyDropdownModule } from '../../dropdown';

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
