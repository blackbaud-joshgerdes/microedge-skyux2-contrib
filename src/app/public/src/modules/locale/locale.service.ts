import { Injectable } from '@angular/core';
import { LocaleService, TranslationService } from 'angular-l10n';
import { translationDict } from '../i18n';

@Injectable()
export class SkyContribLocaleService {
  public languageCode: string;

  constructor(
    public locale: LocaleService,
    public translation: TranslationService
  ) {
    this.locale.setCurrentCurrency('USD');

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
    if (value === '' || value === 'null' || value === undefined) {
      localStorage.removeItem('/currentLanguage');
    } else {
      localStorage.setItem('/currentLanguage', value);
    }
  }

  public changeActiveLocale(langCode: string) {
    if (langCode && this.languageCode !== langCode) {
      langCode = langCode.replace('_', '-').toLowerCase();
      // If the chosen locale matches the browser language, we clear the language value
      // from local storage so that the user can use browser settings
      this.currentLanguage = langCode ===
        navigator.language.toLowerCase() ? undefined : langCode;
      this.setCurrentLocale(langCode);
    }
  }

  public setCurrentLocale(userLang: string) {
    userLang = userLang.toLowerCase();
    if (!translationDict[userLang.replace('_', '-')]) {
      userLang = 'en-us';
    }

    this.languageCode = userLang;
    let currentLanguageSplit = userLang.split('-');
    this.locale.setDefaultLocale(currentLanguageSplit[0], currentLanguageSplit[1]);
  }

  public getDefaultLocale(): string {
    return this.locale.getDefaultLocale();
  }

  public getCurrentCurrency() {
    return this.locale.getCurrentCurrency();
  }
}
