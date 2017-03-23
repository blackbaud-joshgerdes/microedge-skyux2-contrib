import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SkyToastProvider } from './toast.provider';

@Component({
  selector: 'sky-contrib-toast',
  template: '',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './toast.component.scss'
  ]
})
export class SkyToastComponent {
  constructor( public toastr: SkyToastProvider ) {
  }

  setDismiss(enabled: boolean) {
    this.toastr.setDismiss(enabled);
  }

  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title);
  }

  showError(message: string, title?: string) {
    this.toastr.error(message, title);
  }

  showWarning(message: string, title?: string) {
    this.toastr.warning(message, title);
  }

  showInfo(message: string, title?: string) {
    this.toastr.info(message, title);
  }
}
