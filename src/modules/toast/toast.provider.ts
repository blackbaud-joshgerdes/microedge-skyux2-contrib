import { Injectable, ViewContainerRef, Compiler, NgModule, ComponentRef, Optional, Inject, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyToastOptions } from './toast.options';
import { SkyToast } from './toast.model';
import { SkyToastContainer } from './toast-container.component';
import { SkyToastModule } from './toast.module';

@Injectable()
export class SkyToastProvider {
  private container: ComponentRef<SkyToastContainer> = null;
  private options = {
    autoDismiss: true,
    toastLife: 3000
  };
  private index = 0;

  constructor(private resolver: ComponentFactoryResolver, private appRef: ApplicationRef, private compiler: Compiler, @Optional() @Inject(SkyToastOptions) options: SkyToastOptions) {
    if (options) {
      Object.assign(this.options, options);
    }
  }

  show(toast: SkyToast) {
    if (!this.container) {
      let factory = this.resolver.resolveComponentFactory(SkyToastContainer);

      document.body.appendChild(document.createElement('toast-container'));

      let cmpRef = this.appRef.bootstrap(factory);

      this.container = cmpRef;
    }

    this.setupToast(toast);
  }

  createTimeout(toastId: number) {
    setTimeout(() => {
      this.clearToast(toastId);
    }, this.options.toastLife);
  }

  setupToast(toast: SkyToast) {
    toast.id = ++this.index;
    this.container.instance.addToast(toast);
    if (toast.autoDismiss) {
      this.createTimeout(toast.id);
    }
  }

  clearToast(toastId: number) {
    if (this.container) {
      let instance = this.container.instance;
      instance.removeToast(toastId);
      if (!instance.anyToast()) {
        this.dispose();
      }
    }
  }

  dispose() {
    this.container.destroy();
    this.container = null;
  }

  error(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyToast('error', message, title, autoDismiss);
    this.show(toast);
  }

  info(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyToast('info', message, title, autoDismiss);
    this.show(toast);
  }

  success(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyToast('success', message, title, autoDismiss);
    this.show(toast);
  }

  warning(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyToast('warning', message, title, autoDismiss);
    this.show(toast);
  }
}
