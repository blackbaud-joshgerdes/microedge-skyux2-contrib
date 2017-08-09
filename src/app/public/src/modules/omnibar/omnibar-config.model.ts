export class SkyContribOmnibarConfigModel {
  public url: string;
  public appLookupUrl: string;
  public productId: string;
  public serviceName: string;
  public enableHelp: boolean;
  public enableSearch: boolean;
  public searchPlaceholder: string;
  public authenticationUserId: string;
  public signInRedirectUrl: string;
  public signOutRedirectUrl: string;
  public signOutUrl: string;
  public afterLoad: () => {};
  public userLoaded: () => {};
  public menuEl: any;

  constructor(config: any) {
    Object.assign(this, config);
  }
}
