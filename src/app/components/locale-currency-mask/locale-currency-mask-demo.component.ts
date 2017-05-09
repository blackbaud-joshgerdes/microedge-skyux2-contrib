import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sky-locale-currency-mask-demo',
  templateUrl: './locale-currency-mask-demo.component.html'
})
export class SkyLocaleCurrencyMaskDemoComponent {
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
