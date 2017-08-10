import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyCheckboxModule } from '@blackbaud/skyux/dist/core';
import { SkyContribLinkRecordsComponent } from './link-records.component';
import { SkyContribLinkRecordsItemComponent } from './link-records-item.component';
import { SkyContribLinkRecordsItemContentComponent } from './link-records-item-content.component';
import { SkyContribLinkRecordsItemDiffComponent } from './link-records-item-diff.component';
import { SkyContribLinkRecordsItemTitleComponent } from './link-records-item-title.component';
import { SkyContribLinkRecordsMatchContentComponent } from './link-records-match-content.component';
import {
  SkyContribLinkRecordsNoMatchContentComponent
} from './link-records-nomatch-content.component';
import { SkyContribLinkRecordsRendererComponent } from './link-records-renderer.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribLinkRecordsComponent,
    SkyContribLinkRecordsItemComponent,
    SkyContribLinkRecordsItemDiffComponent,
    SkyContribLinkRecordsItemTitleComponent,
    SkyContribLinkRecordsItemContentComponent,
    SkyContribLinkRecordsMatchContentComponent,
    SkyContribLinkRecordsNoMatchContentComponent,
    SkyContribLinkRecordsRendererComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule
  ],
  exports: [
    SkyContribLinkRecordsComponent,
    SkyContribLinkRecordsItemComponent,
    SkyContribLinkRecordsItemDiffComponent,
    SkyContribLinkRecordsItemTitleComponent,
    SkyContribLinkRecordsItemContentComponent,
    SkyContribLinkRecordsMatchContentComponent,
    SkyContribLinkRecordsNoMatchContentComponent,
    SkyContribLinkRecordsRendererComponent
  ]
})
export class SkyContribLinkRecordsModule {
}
