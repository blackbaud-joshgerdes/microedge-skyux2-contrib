import { Component, NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MicroedgeSkyContribModule } from '../../../../src/core';
import { Bootstrapper } from '../../../../visual/bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './locale-currency-mask.component.visual-fixture.html'
})
class AppComponent {
  @ViewChild('currencyInput') input: any;

  ngAfterViewInit() {
    this.input.nativeElement.dispatchEvent(new KeyboardEvent('keypress', {'key': '0'}));
  }
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
