import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribLinkRecordsComponent } from './link-records.component';
import { SkyContribLinkRecordsItemComponent } from './link-records-item.component';
import { SkyContribLinkRecordsItemTitleComponent } from './link-records-item-title.component';
import { SkyContribLinkRecordsItemContentComponent } from './link-records-item-content.component';
import { SkyContribLinkRecordsMatchContentComponent } from './link-records-match-content.component';
import { SkyContribLinkRecordsRendererComponent } from './link-records-renderer.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribLinkRecordsComponent,
    SkyContribLinkRecordsItemComponent,
    SkyContribLinkRecordsItemTitleComponent,
    SkyContribLinkRecordsItemContentComponent,
    SkyContribLinkRecordsMatchContentComponent,
    SkyContribLinkRecordsRendererComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyContribLinkRecordsComponent,
    SkyContribLinkRecordsItemComponent,
    SkyContribLinkRecordsItemTitleComponent,
    SkyContribLinkRecordsItemContentComponent,
    SkyContribLinkRecordsMatchContentComponent,
    SkyContribLinkRecordsRendererComponent
  ]
})
export class SkyContribLinkRecordsModule {
}
