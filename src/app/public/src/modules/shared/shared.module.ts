import { NgModule } from '@angular/core';
import { SkyContribConfigService } from './config.service';
import { SkyContribConsoleService } from './console.service';

@NgModule({
  providers: [
    SkyContribConfigService,
    SkyContribConsoleService
  ]
})
export class SkyContribSharedModule { }
