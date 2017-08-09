import { Injectable } from '@angular/core';

@Injectable()
export class SkyContribConsoleService {
  public displayDeprecatedMessages: boolean = true;

  public deprecated(componentName: string, replacementComponentName: string) {
    if (!this.displayDeprecatedMessages) {
      return;
    }

    if (componentName && componentName.length > 0 &&
        replacementComponentName && replacementComponentName.length > 0) {
      console.warn(`${componentName} has been deprecated, please use ${replacementComponentName}.
        This component will be removed in future versions of this library.`);
    } else {
      console.warn(`This component has been deprecated and will be removed in future versions
        of this library.`);
    }
  }
}
