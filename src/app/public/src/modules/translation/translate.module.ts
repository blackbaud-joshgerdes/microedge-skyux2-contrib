import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribTranslateService } from './translate.service';
import { SkyContribTranslatePipe } from './translate.pipe';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyContribTranslatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyContribTranslatePipe
  ],
  providers: [
    SkyContribTranslateService
  ]
})
export class SkyContribTranslateModule {
}
