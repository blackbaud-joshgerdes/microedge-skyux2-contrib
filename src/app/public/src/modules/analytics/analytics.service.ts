import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
        '$email': data.emailAddress,
        '$last_login': moment.utc().format(),
        'User Id': id,
        'Email': data.emailAddress
      });
    }
  }

  public register(data: {[key: string]: string}, once: boolean = false) {
    if (!this.initialized || !data) {
      return;
    }

    if (once) {
      mixpanel.register_once(JSON.stringify(data));
    } else {
      mixpanel.register(JSON.stringify(data));
    }
  }

  public track(eventName: string, properties?: {[key: string]: string}, logRoute = false) {
    if (!this.initialized ||
        !eventName || eventName.length === 0) {
      return;
    }

    if (logRoute) {
      this.router.events
        .filter(event => event instanceof NavigationEnd)
        .take(1)
        .subscribe((navigationValue: NavigationEnd) => {
          properties = (properties) ? properties : {};
          properties['Route Requested'] = navigationValue.url;

          mixpanel.track(eventName, properties);
        });
    } else {
      mixpanel.track(eventName, properties);
    }
  }

  public trackLinks(selector: string, eventName: string, properties?: {[key: string]: string}, logRoute = false) {
    if (!this.initialized ||
        !selector || selector.length === 0 ||
        !eventName || eventName.length === 0) {
      return;
    }

    if (logRoute) {
      this.router.events
        .filter(event => event instanceof NavigationEnd)
        .take(1)
        .subscribe((navigationValue: NavigationEnd) => {
          properties = (properties) ? properties : {};
          properties['Route Requested'] = navigationValue.url;

          mixpanel.track_links(selector, eventName, properties);
        });
    } else {
      mixpanel.track_links(selector, eventName, properties);
    }
  }
}
