import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
let mixpanel = require('mixpanel-browser/build/mixpanel.umd.js');

@Injectable()
export class SkyContribAnalyticsService {
  private initialized: boolean = false;
  private config: any = {
    secure_cookie: true
  };

  constructor(
    private router: Router
  ) {}

  public init(token: string, config?: any) {
    if (!token || token.length === 0) {
      throw new Error('Token must be provided to initialize analytics.');
    }

    this.config = Object.assign(this.config, config || {});
    mixpanel.init(token, this.config);
    this.initialized = true;
  }

  public identity(id: string, data?: any) {
    if (!this.initialized || !id || id.length === 0) {
      return;
    }

    mixpanel.identify(id);

    let keys: Array<string> = Object.keys(data || {});
    if (data && keys.indexOf('emailAddress') > -1) {
      mixpanel.people.set({
        '$first_name': data.firstName,
        '$last_name': data.lastName,
        '$email': data.emailAddress,
        '$last_login': moment.utc().format(),
        'User Id': id,
        'Name': `${data.firstName} ${data.lastName}`
      });
    }
  }

  public register(data: {[key: string]: string}, once: boolean = false) {
    if (!this.initialized || !data) {
      return;
    }

    if (once) {
      mixpanel.register_once(data);
    } else {
      mixpanel.register(data);
    }
  }

  public track(eventName: string, properties?: {[key: string]: any}, logRoute = false) {
    if (!this.initialized ||
        !eventName || eventName.length === 0) {
      return;
    }

    if (logRoute) {
      properties = (properties) ? properties : {};
      properties['Route Requested'] = this.formatUrl(this.router.url);

      mixpanel.track(eventName, properties);
    } else {
      mixpanel.track(eventName, properties);
    }
  }

  public trackLinks(selector: string, eventName: string, properties?: {[key: string]: any}, logRoute = false) {
    if (!this.initialized ||
        !selector || selector.length === 0 ||
        !eventName || eventName.length === 0) {
      return;
    }

    if (logRoute) {
      properties = (properties) ? properties : {};
      properties['Route Requested'] = this.formatUrl(this.router.url);

      mixpanel.track_links(selector, eventName, properties);
    } else {
      mixpanel.track_links(selector, eventName, properties);
    }
  }

  private formatUrl(url: string): string {
    let paramsIndx = url.indexOf('?');
    url = paramsIndx === -1 ? url : url.substr(0, paramsIndx);

    if (url.match(/^(\/grant\/|\/contact\/|\/organization\/)/)) {
      url = url.substr(0, url.indexOf('/', 1));
    }

    return url;
  }
}
