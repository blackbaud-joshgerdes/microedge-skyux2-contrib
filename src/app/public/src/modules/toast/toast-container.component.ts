import { Component, Optional, Inject } from '@angular/core';
import { SkyContribToastOptions } from './toast.options';
import { SkyContribToast } from './toast.model';

@Component({
  selector: 'toast-container',
  templateUrl: './toast-container.component.html'
})
export class SkyContribToastContainerComponent {
  public position = 'fixed';
  public messageClass = 'toast-message';
  public titleClass = 'toast-title';
  public positionClass = 'toast-bottom-right';
  public toasts: SkyContribToast[] = [];
  public maxShown = 5;
  public autoDismiss = true;
  public isAdding: boolean;

  constructor(@Optional() @Inject(SkyContribToastOptions) options: SkyContribToastOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }

  public addToast(toast: SkyContribToast) {
    this.isAdding = true;

    if (this.positionClass.indexOf('top') > 0) {
      this.toasts.push(toast);
      if (this.toasts.length > this.maxShown) {
        this.toasts.splice(0, (this.toasts.length - this.maxShown));
      }
    } else {
      this.toasts.unshift(toast);
      if (this.toasts.length > this.maxShown) {
        this.toasts.splice(this.maxShown, (this.toasts.length - this.maxShown));
      }
    }
  }

  public removeToast(toastId: number) {
    this.isAdding = false;

    for (let toast of this.toasts) {
      if (toast.id === toastId) {
        toast.classNames = 'animated bounceOut';
      }
    }

    setTimeout(() => {
      this.toasts = this.toasts.filter((toast) => {
        return toast.id !== toastId;
      });
    }, 800);
  }

  public dismiss(toast: SkyContribToast) {
    if (!toast.autoDismiss) {
      this.removeToast(toast.id);
    }
  }

  public anyToast(): boolean {
    return this.toasts.length > 0;
  }

  public findToast(toastId: number): SkyContribToast {
    for (let toast of this.toasts) {
      if (toast.id === toastId) {
        return toast;
      }
    }
    return undefined;
  }
}
