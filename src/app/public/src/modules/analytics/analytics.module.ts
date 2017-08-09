import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribAnalyticsService } from './analytics.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SkyContribAnalyticsService
  ]
})
export class SkyContribAnalyticsModule {
}
