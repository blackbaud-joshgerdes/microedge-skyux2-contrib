import { Injectable } from '@angular/core';

@Injectable()
export class SkyContribConfigService {
  public skyux: any = {
    app: {
      title: ''
    }
  };

  public runtime: any = {
    routes: []
  };
}
