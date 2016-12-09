import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MicroedgeSkyContribModule } from '../../../../src/core';

import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './spinner.component.visual-fixture.html',
  styleUrls: ['./spinner.component.visual-fixture.scss']
})
export class AppComponent {
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
