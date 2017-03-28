import { Component, Optional, Inject } from '@angular/core';
import { SkyToastOptions } from './toast.options';
import { SkyToast } from './toast.model';

@Component({
  selector: 'toast-container',
  templateUrl: './toast-container.component.html'
})
export class SkyToastContainer {
  position = 'fixed';
  messageClass = 'toast-message';
  titleClass = 'toast-title';
  positionClass = 'toast-bottom-right';
  toasts: SkyToast[] = [];
  maxShown = 5;
  autoDismiss = true;
  isAdding: boolean;

  constructor(@Optional() @Inject(SkyToastOptions) options: SkyToastOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }

  addToast(toast: SkyToast) {
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

  removeToast(toastId: number) {
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

  dismiss(toast: SkyToast) {
    if (!this.autoDismiss) {
      this.removeToast(toast.id);
    }
  }

  anyToast(): boolean {
    return this.toasts.length > 0;
  }

  findToast(toastId: number): SkyToast {
    for (let toast of this.toasts) {
      if (toast.id === toastId) {
        return toast;
      }
    }
    return null;
  }
}
