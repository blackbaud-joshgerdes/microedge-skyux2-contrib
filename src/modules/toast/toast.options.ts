import { Injectable } from '@angular/core';

@Injectable()
export class SkyContribToastOptions {
  messageClass: string;
  titleClass: string;
  positionClass: string;
  autoDismiss: boolean;
  maxShown: number;
  toastLife: number;

  constructor(options: Object) {
    Object.assign(this, options);
  }
}
