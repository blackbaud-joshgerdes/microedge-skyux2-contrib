import { Injectable, Compiler, ComponentRef, Optional, Inject,
  ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { SkyContribToastOptions } from './toast.options';
import { SkyContribToast } from './toast.model';
import { SkyContribToastContainerComponent } from './toast-container.component';

@Injectable()
export class SkyContribToastProvider {
  private container: ComponentRef<SkyContribToastContainerComponent> = null;
  private options = {
    autoDismiss: true,
    toastLife: 3000
  };
  private index = 0;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private compiler: Compiler,
    @Optional() @Inject(SkyContribToastOptions) options: SkyContribToastOptions
  ) {
    if (options) {
      Object.assign(this.options, options);
    }
  }

  show(toast: SkyContribToast) {
    if (!this.container) {
      let factory = this.resolver.resolveComponentFactory(SkyContribToastContainerComponent);

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

  setupToast(toast: SkyContribToast) {
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
    let toast = new SkyContribToast('error', message, title, autoDismiss);
    this.show(toast);
  }

  info(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyContribToast('info', message, title, autoDismiss);
    this.show(toast);
  }

  success(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyContribToast('success', message, title, autoDismiss);
    this.show(toast);
  }

  warning(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyContribToast('warning', message, title, autoDismiss);
    this.show(toast);
  }
}
