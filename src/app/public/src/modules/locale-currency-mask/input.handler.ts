import { InputService } from './input.service';

export class InputHandler {
  private inputService: InputService;
  private onModelChange: Function;
  private onModelTouched: Function;

  constructor(
    htmlInputElement: HTMLInputElement,
    locale: string,
    currency: string,
    allowNegative: boolean
  ) {
    this.inputService = new InputService(htmlInputElement, locale, currency, allowNegative);
  }

  public handleCut(event: any): void {
    setTimeout(() => {
      this.inputService.updateFieldValue();
      this.setValue(this.inputService.value);
      this.onModelChange(this.inputService.value);
    }, 0);
  }

  public handleInput(event: any): void {
    if (this.inputService.rawValue) {
      let keyCode = this.inputService.rawValue.charCodeAt(this.inputService.rawValue.length - 1);
      let rawValueLength = this.inputService.rawValue.length;
      let rawValueSelectionStart = this.inputService.inputSelection.selectionStart;
      let storedRawValueLength =
        this.inputService.storedRawValue ? this.inputService.storedRawValue.length : 0;
      this.inputService.rawValue = this.inputService.storedRawValue;

      // this fires every keystroke, if the cursor isn't at the end
      // or if the event caused 0 or over 1 changes in length (pasting a value, etc)
      // don't do anything but return the cursor to the end
      if (rawValueLength !== rawValueSelectionStart ||
        Math.abs(rawValueLength - storedRawValueLength) !== 1) {
        this.setCursorPosition(event);
        return;
      }

      if (rawValueLength < storedRawValueLength) {
        this.inputService.removeNumber(8);
      }

      if (rawValueLength > storedRawValueLength) {
        switch (keyCode) {
          case 43:
            this.inputService.changeToPositive();
            break;
          case 45:
            this.inputService.changeToNegative();
            break;
          default:
            if (!this.inputService.canInputMoreNumbers) {
              return;
            }

            this.inputService.addNumber(keyCode);
        }
      }

      this.setCursorPosition(event);
      this.onModelChange(this.inputService.value);
    }
  }

  public handleKeydown(event: any): void {
    let keyCode = event.which || event.charCode || event.keyCode;

    if (keyCode === 8 || keyCode === 46 || keyCode === 63272) {
      event.preventDefault();
      let selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd -
        this.inputService.inputSelection.selectionStart);

      /* istanbul ignore else  */
      if (selectionRangeLength === 0) {
        this.inputService.removeNumber(keyCode);
        this.onModelChange(this.inputService.value);
      }

      if (selectionRangeLength === this.inputService.rawValue.length) {
        this.setValue(0);
        this.onModelChange(this.inputService.value);
      }
    }
  }

  public handleKeypress(event: any): void {
    let keyCode = event.which || event.charCode || event.keyCode;

    switch (keyCode) {
      case undefined:
        return;
      case 43:
        this.inputService.changeToPositive();
        break;
      case 45:
        this.inputService.changeToNegative();
        break;
      default:
        let selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd -
          this.inputService.inputSelection.selectionStart);

        /* istanbul ignore else  */
        if (this.inputService.canInputMoreNumbers && (selectionRangeLength === 0 ||
          selectionRangeLength === this.inputService.rawValue.length)) {
          /* istanbul ignore else  */
          if (selectionRangeLength === this.inputService.rawValue.length) {
            this.setValue(0);
          }

          this.inputService.addNumber(keyCode);
        }
    }

    event.preventDefault();
    this.onModelChange(this.inputService.value);
  }

  public handlePaste(event: any): void {
    setTimeout(() => {
      this.inputService.updateFieldValue();
      this.setValue(this.inputService.value);
      this.onModelChange(this.inputService.value);
    }, 1);
  }

  public updateOptions(locale: string, currency: string, allowNegative: boolean): void {
    this.inputService.updateOptions(locale, currency, allowNegative);
  }

  public getOnModelChange(): Function {
    return this.onModelChange;
  }

  public setOnModelChange(callbackFunction: Function): void {
    this.onModelChange = callbackFunction;
  }

  public getOnModelTouched(): Function {
    return this.onModelTouched;
  }

  public setOnModelTouched(callbackFunction: Function) {
    this.onModelTouched = callbackFunction;
  }

  public setValue(value: number): void {
    this.inputService.value = value;
  }

  private setCursorPosition(event: any): void {
    setTimeout(function () {
      event.target.setSelectionRange(event.target.value.length, event.target.value.length);
    }, 0);
  }
}
