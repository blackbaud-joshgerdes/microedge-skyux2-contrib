import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, BehaviorSubject } from 'rxjs';

import { MicroedgeSkyContribModule } from '../../../src/core';
import { ListItemModel } from '../../../src/modules/list/state/items/item.model';

import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './app.component.html'
})
class AppComponent {
  public content:string = "berowbgrbgowebwuebf gergre greg ergre ger gerg erg erger ge ge";
}

@NgModule({
  imports: [
    BrowserModule,
    MicroedgeSkyContribModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
class AppModule { }

Bootstrapper.bootstrapModule(AppModule);
