import { AfterViewInit, Directive, ElementRef,
  forwardRef, HostListener, Input, OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputHandler } from './input.handler';

let areIntlLocalesSupported = require('intl-locales-supported');
let getCanonicalLocales = require('intl').getCanonicalLocales;

export const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyContribLocaleCurrencyMaskDirective),
  multi: true
};

@Directive({
  selector: 'input[localeCurrencyMask]',
  exportAs: 'localeCurrencyMaskDirective',
  providers: [CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR]
})
export class SkyContribLocaleCurrencyMaskDirective implements AfterViewInit,
  ControlValueAccessor, OnInit {
  @Input() locale: string = 'en-US';
  @Input() currency: string = 'USD';
  @Input() align: string = 'right';
  @Input() allowNegative = false;

  inputHandler: InputHandler;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.inputHandler = new InputHandler(
      this.elementRef.nativeElement, this.formatLocale(this.locale),
        this.currency, this.allowNegative);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.textAlign = this.align;
  }

  @HostListener('cut', ['$event'])
  handleCut(event: any) {
    if (!this.isChromeAndroid()) {
        this.inputHandler.handleCut(event);
    }
  }

  @HostListener('input', ['$event'])
  handleInput(event: any) {
    if (this.isChromeAndroid()) {
        this.inputHandler.handleInput(event);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: any) {
    if (!this.isChromeAndroid()) {
        this.inputHandler.handleKeydown(event);
    }
  }

  @HostListener('keypress', ['$event'])
  handleKeypress(event: any) {
    if (!this.isChromeAndroid()) {
        this.inputHandler.handleKeypress(event);
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: any) {
    if (!this.isChromeAndroid()) {
        this.inputHandler.handlePaste(event);
    }
  }

  isChromeAndroid(): boolean {
    return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
  }

  registerOnChange(callbackFunction: Function): void {
    this.inputHandler.setOnModelChange(callbackFunction);
  }

  registerOnTouched(callbackFunction: Function): void {
    this.inputHandler.setOnModelTouched(callbackFunction);
  }

  setDisabledState(value: boolean): void {
    this.elementRef.nativeElement.disabled = value;
  }

  writeValue(value: number): void {
    this.inputHandler.setValue(value);
  }

  private formatLocale(locale: string): string {
    locale = locale.replace('_', '-');

    if (areIntlLocalesSupported([locale])) {
      return getCanonicalLocales([locale])[0];
    } else {
      // if the locale is not supported, default to en-US
      return 'en-US';
    }
  }
}
