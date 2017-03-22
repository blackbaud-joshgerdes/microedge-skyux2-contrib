import { EventEmitter, Type } from '@angular/core';

export interface SaveAndCloseComponent {
  onSaveAndClose: EventEmitter<SaveAndCloseEvent>;
}

export interface SaveAndCloseEvent {
  saved: boolean;
}
