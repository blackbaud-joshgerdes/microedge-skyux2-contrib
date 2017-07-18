import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyChevronModule } from '../chevron';
import { SkyContribSpinnerModule } from '../spinner';
import { SkyContribListViewRepeaterComponent } from './list-view-repeater.component';
import { SkyContribListViewRepeaterRendererComponent }
  from './list-view-repeater-renderer.component';
import { SkyContribListViewRepeaterLeftComponent } from './list-view-repeater-left.component';
import { SkyContribListViewRepeaterRightComponent } from './list-view-repeater-right.component';
import { SkyContribListViewRepeaterTitleComponent } from './list-view-repeater-title.component';
import {
  SkyContribListViewRepeaterDescriptionComponent
} from './list-view-repeater-description.component';
import { SkyContribListViewRepeaterContentComponent } from './list-view-repeater-content.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribListViewRepeaterComponent,
    SkyContribListViewRepeaterLeftComponent,
    SkyContribListViewRepeaterRightComponent,
    SkyContribListViewRepeaterTitleComponent,
    SkyContribListViewRepeaterDescriptionComponent,
    SkyContribListViewRepeaterContentComponent,
    SkyContribListViewRepeaterRendererComponent
  ],
  imports: [
    CommonModule,
    SkyChevronModule,
    SkyContribSpinnerModule
  ],
  exports: [
    SkyContribListViewRepeaterComponent,
    SkyContribListViewRepeaterLeftComponent,
    SkyContribListViewRepeaterRightComponent,
    SkyContribListViewRepeaterTitleComponent,
    SkyContribListViewRepeaterDescriptionComponent,
    SkyContribListViewRepeaterContentComponent,
    SkyContribListViewRepeaterRendererComponent
  ],
  providers: [
  ]
})
export class SkyContribListViewRepeaterModule {
}
