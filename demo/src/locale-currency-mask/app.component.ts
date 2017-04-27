import { Component, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MicroedgeSkyContribModule } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

@Component({
  selector: 'sky-demo-app',
  templateUrl: './app.component.html'
})
class AppComponent {
  currencyForm: FormGroup;
  amount: string = '42';

  constructor(formBuilder: FormBuilder) {
    this.currencyForm = formBuilder.group({
      default: [this.amount],
      us: [this.amount],
      british: [this.amount],
      canadian: [this.amount],
      australian: [this.amount]
    });
  }
}

@NgModule({
  imports: [
    BrowserModule,
    MicroedgeSkyContribModule,
    FormsModule,
    ReactiveFormsModule
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
