import {
  Inject,
  Injectable,
  ComponentRef,
  Optional,
  ComponentFactoryResolver,
  ApplicationRef
} from '@angular/core';
import { SkyContribToastOptions } from './toast.options';
import { SkyContribToast } from './toast.model';
import {
  SkyContribToastContainerComponent
} from './toast-container.component';

@Injectable()
export class SkyContribToastProvider {
  private container: ComponentRef<SkyContribToastContainerComponent> = undefined;
  private options = {
    autoDismiss: true,
    toastLife: 3000
  };
  private index = 0;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    @Optional() @Inject(SkyContribToastOptions) options: SkyContribToastOptions
  ) {
    if (options) {
      Object.assign(this.options, options);
    }
  }

  public show(toast: SkyContribToast) {
    if (!this.container) {
      let factory = this.resolver.resolveComponentFactory(SkyContribToastContainerComponent);

      document.body.appendChild(document.createElement('toast-container'));

      let cmpRef = this.appRef.bootstrap(factory);

      this.container = cmpRef;
    }

    this.setupToast(toast);
  }

  public createTimeout(toastId: number) {
    setTimeout(() => {
      this.clearToast(toastId);
    }, this.options.toastLife);
  }

  public setupToast(toast: SkyContribToast) {
    toast.id = ++this.index;
    this.container.instance.addToast(toast);
    if (toast.autoDismiss) {
      this.createTimeout(toast.id);
    }
  }

  public clearToast(toastId: number) {
    if (this.container) {
      let instance = this.container.instance;
      instance.removeToast(toastId);
      if (!instance.anyToast()) {
        this.dispose();
      }
    }
  }

  public dispose() {
    this.container.destroy();
    this.container = undefined;
  }

  public error(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyContribToast('error', message, title, autoDismiss);
    this.show(toast);
  }

  public info(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyContribToast('info', message, title, autoDismiss);
    this.show(toast);
  }

  public success(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyContribToast('success', message, title, autoDismiss);
    this.show(toast);
  }

  public warning(message: string, title?: string, autoDismiss?: boolean) {
    let toast = new SkyContribToast('warning', message, title, autoDismiss);
    this.show(toast);
  }
}
