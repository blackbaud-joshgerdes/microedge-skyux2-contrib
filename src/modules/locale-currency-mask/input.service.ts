import { InputManager } from './input.manager';

export class InputService {
  private inputManager: InputManager;
  private localeNumberFormat: Intl.NumberFormat;

  constructor (
    private htmlInputElement: any,
    private locale: string,
    private currency: string,
    private allowNegative: boolean
  ) {
    this.inputManager = new InputManager(htmlInputElement);
    this.localeNumberFormat = new Intl.NumberFormat(this.locale, {
      style: 'currency', currency: this.currency, maximumFractionDigits: 2
    });
  }

  addNumber(keyCode: number): void {
    if (!this.rawValue) {
      this.rawValue = this.applyMask(false, '0');
    }

    let keyChar = String.fromCharCode(keyCode);
    let selectionStart = this.inputSelection.selectionStart;
    let selectionEnd = this.inputSelection.selectionEnd;
    this.rawValue = this.rawValue.substring(0, selectionStart) +
      keyChar + this.rawValue.substring(selectionEnd, this.rawValue.length);
    this.updateFieldValue(selectionStart + 1);
  }

  applyMask(isNumber: boolean, rawValue: string): string {
    rawValue = isNumber ? new Number(rawValue).toFixed(2) : rawValue;
    let onlyNumbers = rawValue.replace(/[^0-9]/g, '');

    if (!onlyNumbers) {
      return '';
    }

    let integerPart = onlyNumbers.slice(0, onlyNumbers.length - 2)
      .replace(/^0*/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '');

    if (integerPart === '') {
      integerPart = '0';
    }

    let newRawValue = integerPart;
    let decimalPart = onlyNumbers.slice(onlyNumbers.length - 2);
    newRawValue += '.' + decimalPart;

    return this.localeNumberFormat.format(parseFloat(newRawValue));
  }

  clearMask(rawValue: string): number {
    let value = (rawValue || '0.00').replace(/[^0-9]/g, '');
    let valLength = value.length;

    value = `${value.slice(0, valLength - 2)}.${value.slice(valLength - 2, valLength)}`;

    return parseFloat(value);
  }

  changeToNegative(): void {
    if (this.allowNegative && this.rawValue !== '' &&
      this.rawValue.charAt(0) !== '-' && this.value !== 0) {
      this.rawValue = '-' + this.rawValue;
    }
  }

  changeToPositive(): void {
    this.rawValue = this.rawValue.replace('-', '');
  }

  removeNumber(keyCode: number): void {
    let selectionEnd = this.inputSelection.selectionEnd;
    let selectionStart = this.inputSelection.selectionStart;

    if (selectionStart > this.rawValue.length) {
      selectionEnd = this.rawValue.length;
      selectionStart = this.rawValue.length;
    }

    selectionEnd = keyCode === 46 || keyCode === 63272 ? selectionEnd + 1 : selectionEnd;
    selectionStart = keyCode === 8 ? selectionStart - 1 : selectionStart;
    this.rawValue = this.rawValue.substring(0, selectionStart) +
      this.rawValue.substring(selectionEnd, this.rawValue.length);
    this.updateFieldValue(selectionStart);
  }

  updateFieldValue(selectionStart?: number): void {
    let newRawValue = this.applyMask(false, this.rawValue || '');
    selectionStart = selectionStart === undefined ? this.rawValue.length : selectionStart;
    this.inputManager.updateValueAndCursor(newRawValue, this.rawValue.length, selectionStart);
  }

  updateOptions(locale: string, currency: string, allowNegative: boolean): void {
    this.locale = locale;
    this.currency = currency;
    this.allowNegative = allowNegative;
    this.localeNumberFormat = new Intl.NumberFormat(this.locale, {
      style: 'currency', currency: this.currency, maximumFractionDigits: 2
    });
    let value: number = this.value;
    this.value = value;
  }

  get canInputMoreNumbers(): boolean {
    return this.inputManager.canInputMoreNumbers;
  }

  get inputSelection(): any {
    return this.inputManager.inputSelection;
  }

  get rawValue(): string {
    return this.inputManager.rawValue;
  }

  set rawValue(value: string) {
    this.inputManager.rawValue = value;
  }

  get storedRawValue(): string {
    return this.inputManager.storedRawValue;
  }

  get value(): number {
    return this.clearMask(this.rawValue);
  }

  set value(value: number) {
    this.rawValue = this.applyMask(true, '' + value);
  }
}
