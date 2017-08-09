import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputHandler } from './input.handler';

let areIntlLocalesSupported = require('intl-locales-supported');
let getCanonicalLocales = require('intl').getCanonicalLocales;

export const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
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
  @Input() public locale: string = 'en-US';
  @Input() public currency: string = 'USD';
  @Input() public align: string = 'right';
  @Input() public allowNegative = false;

  public inputHandler: InputHandler;

  constructor(private elementRef: ElementRef) {
  }

  public ngOnInit() {
    this.inputHandler = new InputHandler(
      this.elementRef.nativeElement,
      this.formatLocale(this.locale),
      this.currency,
      this.allowNegative
    );
  }

  public ngAfterViewInit() {
    this.elementRef.nativeElement.style.textAlign = this.align;
  }

  @HostListener('cut', ['$event'])
  public handleCut(event: any) {
    if (!this.isChromeAndroid()) {
        this.inputHandler.handleCut(event);
    }
  }

  @HostListener('input', ['$event'])
  public handleInput(event: any) {
    if (this.isChromeAndroid()) {
        this.inputHandler.handleInput(event);
    }
  }

  @HostListener('keydown', ['$event'])
  public handleKeydown(event: any) {
    if (!this.isChromeAndroid()) {
        this.inputHandler.handleKeydown(event);
    }
  }

  @HostListener('keypress', ['$event'])
  public handleKeypress(event: any) {
    if (!this.isChromeAndroid()) {
        this.inputHandler.handleKeypress(event);
    }
  }

  @HostListener('paste', ['$event'])
  public handlePaste(event: any) {
    if (!this.isChromeAndroid()) {
        this.inputHandler.handlePaste(event);
    }
  }

  public isChromeAndroid(): boolean {
    return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
  }

  public registerOnChange(callbackFunction: Function): void {
    this.inputHandler.setOnModelChange(callbackFunction);
  }

  public registerOnTouched(callbackFunction: Function): void {
    this.inputHandler.setOnModelTouched(callbackFunction);
  }

  public setDisabledState(value: boolean): void {
    this.elementRef.nativeElement.disabled = value;
  }

  public writeValue(value: number): void {
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
