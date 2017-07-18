import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class SkyContribDemoTitleService {
  constructor(private title: Title) { }

  public setTitle(...parts: string[]) {
    let windowTitle = 'SkyUX Contrib';

    if (parts && parts.length > 0) {
      parts.push(windowTitle);
      windowTitle = parts.join(' - ');
    }

    this.title.setTitle(windowTitle);
  }
}
