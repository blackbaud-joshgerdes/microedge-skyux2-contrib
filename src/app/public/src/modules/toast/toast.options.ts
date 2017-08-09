import { Injectable } from '@angular/core';

@Injectable()
export class SkyContribToastOptions {
  public messageClass: string;
  public titleClass: string;
  public positionClass: string;
  public autoDismiss: boolean;
  public maxShown: number;
  public toastLife: number;

  constructor(private options: Object) {
    Object.assign(this, this.options);
  }
}
