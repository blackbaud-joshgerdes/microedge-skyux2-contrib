import { Injectable } from '@angular/core';
import { SkyContribLocaleService } from '../locale';
import { translationDict } from '../i18n';

@Injectable()
export class SkyContribTranslateService {
  constructor(
    public localeService: SkyContribLocaleService
  ) {
  }

  public translate(key: string): string {
    return this.localeService.localization
      .translate(key, null, this.localeService.languageCode.toLowerCase());
  }

  public addTranslation(language: string, translation: any) {
    if (!language) {
      return;
    }

    language = language.toLowerCase();
    if (translationDict[language]) {
      translation = Object.assign({}, translationDict[language], translation);
    } else {
      translationDict[language] = translation;
    }

    this.localeService.localization.addTranslation(language, translation);
  }
}
