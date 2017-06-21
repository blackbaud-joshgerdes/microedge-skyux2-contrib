import { Injectable } from '@angular/core';
import * as moment from 'moment';
let mixpanel = require('mixpanel-browser/build/mixpanel.umd.js');

@Injectable()
export class SkyContribAnalyticsService {
  private initialized: boolean = false;
  private config: any = {
    secure_cookie: true
  };
  constructor() {}

  init(token: string, config?: any) {
    if (!token || token.length === 0) {
      throw new Error('Token must be provided to initialize analytics.');
    }

    this.config = Object.assign(this.config, config || {});
    mixpanel.init(token, this.config);
    this.initialized = true;
  }

  identity(id: string, data?: any) {
    if (!this.initialized || !id || id.length === 0) {
      return;
    }

    mixpanel.identify(id);

    let keys: Array<string> = Object.keys(data || {});
    if (data && keys.indexOf('emailAddress') > -1) {
      mixpanel.people.set({
        '$email': data.emailAddress,
        '$last_login': moment.utc().format(),
        'User Id': id,
        'Email': data.emailAddress
      });
    }
  }

  register(data: {[key: string]: string}, once: boolean = false) {
    if (!this.initialized || !data) {
      return;
    }

    if (once) {
      mixpanel.register_once(JSON.stringify(data));
    } else {
      mixpanel.register(JSON.stringify(data));
    }
  }

  track(eventName: string, properties?: {[key: string]: string}) {
    if (!this.initialized ||
        !eventName || eventName.length === 0) {
      return;
    }

    mixpanel.track(eventName, properties);
  }

  trackLinks(selector: string, eventName: string, properties?: {[key: string]: string}) {
    if (!this.initialized ||
        !selector || selector.length === 0 ||
        !eventName || eventName.length === 0) {
      return;
    }

    mixpanel.track_links(selector, eventName, properties);
  }
}
