import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyChevronModule } from '../chevron';
import { SkySpinnerModule } from '../spinner';
import { SkyListViewRepeaterComponent } from './list-view-repeater.component';
import { SkyListViewRepeaterRendererComponent } from './list-view-repeater-renderer.component';
import { SkyListViewRepeaterLeftComponent } from './list-view-repeater-left.component';
import { SkyListViewRepeaterRightComponent } from './list-view-repeater-right.component';
import { SkyListViewRepeaterTitleComponent } from './list-view-repeater-title.component';
import {
  SkyListViewRepeaterDescriptionComponent
} from './list-view-repeater-description.component';
import { SkyListViewRepeaterContentComponent } from './list-view-repeater-content.component';

@NgModule({
  declarations: [
    SkyListViewRepeaterComponent,
    SkyListViewRepeaterLeftComponent,
    SkyListViewRepeaterRightComponent,
    SkyListViewRepeaterTitleComponent,
    SkyListViewRepeaterDescriptionComponent,
    SkyListViewRepeaterContentComponent,
    SkyListViewRepeaterRendererComponent
  ],
  imports: [
    CommonModule,
    SkyChevronModule,
    SkySpinnerModule
  ],
  exports: [
    SkyListViewRepeaterComponent,
    SkyListViewRepeaterLeftComponent,
    SkyListViewRepeaterRightComponent,
    SkyListViewRepeaterTitleComponent,
    SkyListViewRepeaterDescriptionComponent,
    SkyListViewRepeaterContentComponent,
    SkyListViewRepeaterRendererComponent
  ],
  providers: [
  ]
})
export class SkyListViewRepeaterModule {
}
