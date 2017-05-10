import { Injectable } from '@angular/core';
import { LocaleService, LocalizationService } from 'angular2localization';
import { translationDict } from '../i18n';

@Injectable()
export class SkyContribLocaleService {
  constructor(
    public locale: LocaleService,
    public localization: LocalizationService
  ) {
    this.localization.addTranslation('en-us', translationDict['en-us']);
    this.localization.addTranslation('en-ca', translationDict['en-ca']);
    this.localization.addTranslation('en-au', translationDict['en-au']);
    this.localization.addTranslation('en-gb', translationDict['en-gb']);
    this.locale.definePreferredCurrency('USD');

    let safeNavigator: any = navigator as any;
    let userLang = (this.currentLanguage) ? this.currentLanguage :
      safeNavigator.languages && safeNavigator.languages[0] ||
      safeNavigator.language || safeNavigator.userLanguage;

    this.setCurrentLocale(userLang);
  }

  public get currentLanguage() {
    return localStorage.getItem('/currentLanguage');
  }

  public set currentLanguage(value: string) {
    if (value === '' || value === 'null' || value == null) {
      localStorage.removeItem('/currentLanguage');
    } else {
      localStorage.setItem('/currentLanguage', value);
    }
  }

  public changeActiveLocale(localeCode: string) {
    if (localeCode && this.localization.languageCode !== localeCode) {
      localeCode = localeCode.toLowerCase();
      // If the chosen locale matches the browser language, we clear the language value
      // from local storage so that the user can use browser settings
      this.currentLanguage = localeCode ===
        navigator.language.toLowerCase() ? null : localeCode;
      this.setCurrentLocale(localeCode);
    }
  }

  public setCurrentLocale(userLang: string) {
    userLang = userLang.toLowerCase();
    if (!translationDict[userLang.replace('_', '-')]) {
      userLang = 'en-us';
    }

    this.localization.languageCode = userLang;
    let currentLanguageSplit = userLang.split('-');
    this.locale.setCurrentLocale(currentLanguageSplit[0], currentLanguageSplit[1]);
    this.localization.updateTranslation(userLang);
  }

  public get languageCode(): string {
    return this.localization.languageCode;
  }

  public getDefaultLocale(): string {
    return this.locale.getDefaultLocale();
  }

  public getCurrentCurrency() {
    return this.locale.getCurrentCurrency();
  }
}
