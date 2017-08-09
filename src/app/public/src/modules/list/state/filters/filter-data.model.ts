import { EventEmitter } from '@angular/core';
import * as moment from 'moment';

export class ListFilterDataModel {
  public id: string = (moment().toDate().getTime() + Math.random()).toString().replace('.', '');
  public value: any = ''; // we use an empty string instead of null to simplify ngModel bindings
  public displayValue: string = '';
  public onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(data?: any) {
    if (data) {
      this.id = data.id || this.id;
      this.value = data.value;
      this.displayValue = data.displayValue || (typeof this.value === 'string' ? this.value : '');
      this.onChange = data.onChange;
    }
  }

  public changed(value: any, key?: string, displayValue?: string) {
    // if key, which is the name of the property for the value object,
    // is specified we're assuming that this.value will be an object, and the value coming in
    // will update a property on the value object specified by the key.
    if (key) {
      this.value = this.value || {};
      this.value[key] = value;
      this.displayValue = displayValue || this.value.displayValue;
    } else {
      this.value = value;
      if (displayValue && displayValue.length > 0) {
        this.displayValue = displayValue;
      } else if (typeof value === 'string' && value.length > 0) {
        this.displayValue = value;
      } else if (Array.isArray(value) && value.length > 0) {
        this.displayValue = value.join(', ');
      }
    }

    this.onChange.emit(value);
  }
}
