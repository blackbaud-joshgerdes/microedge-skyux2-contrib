export class SkyOmnibarConfigModel {
  url: string;
  appLookupUrl: string;
  productId: string;
  serviceName: string;
  enableHelp: boolean;
  enableSearch: boolean;
  searchPlaceholder: string;
  authenticationUserId: string;
  signInRedirectUrl: string;
  signOutRedirectUrl: string;
  signOutUrl: string;
  afterLoad: () => {};
  userLoaded: () => {};
  menuEl: any;

  constructor(config: any) {
    Object.assign(this, config);
  }
}
