export class InputManager {
  private _storedRawValue: string;

  constructor(private htmlInputElement: any) {
  }

  setCursorAt(position: number): void {
    this.htmlInputElement.focus();
    this.htmlInputElement.setSelectionRange(position, position);
  }

  updateValueAndCursor(newRawValue: string, oldLength: number, selectionStart: number): void {
    this.rawValue = newRawValue;
    let newLength = newRawValue.length;
    selectionStart = selectionStart - (oldLength - newLength);
    this.setCursorAt(selectionStart);
  }

  get canInputMoreNumbers(): boolean {
    let haventReachedMaxLength = !(this.rawValue.length >= this.htmlInputElement.maxLength &&
      this.htmlInputElement.maxLength >= 0);
    let selectionStart = this.inputSelection.selectionStart;
    let selectionEnd = this.inputSelection.selectionEnd;
    let haveNumberSelected = (selectionStart !== selectionEnd &&
      this.htmlInputElement.value.substring(selectionStart, selectionEnd).match(/\d/))
        ? true : false;
    let startWithZero = (this.htmlInputElement.value.substring(0, 1) === '0');
    return haventReachedMaxLength || haveNumberSelected || startWithZero;
  }

  get inputSelection(): any {
    return {
      selectionStart: this.htmlInputElement.selectionStart,
      selectionEnd: this.htmlInputElement.selectionEnd
    };
  }

  get rawValue(): string {
    return this.htmlInputElement && this.htmlInputElement.value;
  }

  set rawValue(value: string) {
    this._storedRawValue = value;

    /* istanbul ignore else  */
    if (this.htmlInputElement) {
      this.htmlInputElement.value = value;
    }
  }

  get storedRawValue(): string {
    return this._storedRawValue;
  }
}
