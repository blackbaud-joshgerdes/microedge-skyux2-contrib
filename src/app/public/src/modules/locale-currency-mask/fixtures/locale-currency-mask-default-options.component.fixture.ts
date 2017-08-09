import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './locale-currency-mask-default-options.component.fixture.html'
})
export class LocaleCurrencyMaskDefaultTestComponent {
  @ViewChild('maskInput') public input: HTMLInputElement;
}
