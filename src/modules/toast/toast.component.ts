import { Component, ViewEncapsulation } from '@angular/core';
import { SkyContribToastProvider } from './toast.provider';

@Component({
  selector: 'sky-contrib-toast',
  template: '',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './toast.component.scss'
  ]
})
export class SkyContribToastComponent {
  constructor( public toastr: SkyContribToastProvider ) {
  }

  showSuccess(message: string, title?: string, autoDismiss: boolean = true) {
    this.toastr.success(message, title, autoDismiss);
  }

  showError(message: string, title?: string, autoDismiss: boolean = true) {
    this.toastr.error(message, title, autoDismiss);
  }

  showWarning(message: string, title?: string, autoDismiss: boolean = true) {
    this.toastr.warning(message, title, autoDismiss);
  }

  showInfo(message: string, title?: string, autoDismiss: boolean = true) {
    this.toastr.info(message, title, autoDismiss);
  }
}
