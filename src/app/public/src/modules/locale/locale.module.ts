import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  APP_INITIALIZER,
  Injectable
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyContribLocaleService } from './locale.service';
import {
  LocalizationModule,
  LocaleService,
  TranslationService,
  TranslationModule
} from 'angular-l10n';
import { translationDict } from '../i18n';

@Injectable()
export class LocalizationConfig {
  constructor(public locale: LocaleService, public translation: TranslationService) {}

  public load(): Promise<void> {
    this.locale.addConfiguration()
      .addLanguages(['en-us', 'en-ca', 'en-au', 'en-gb'])
      .defineDefaultLocale('en', 'US')
      .defineCurrency('USD');

    this.translation.addConfiguration()
      .addTranslation('en-us', translationDict['en-us'])
      .addTranslation('en-ca', translationDict['en-ca'])
      .addTranslation('en-au', translationDict['en-au'])
      .addTranslation('en-gb', translationDict['en-gb'])
      .useLocaleAsLanguage();

    return this.translation.init();
  }
}

// AoT compilation requires a reference to an exported function.
export function initLocalization(localizationConfig: LocalizationConfig): Function {
  return () => localizationConfig.load();
}

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    LocalizationModule.forRoot(),
    TranslationModule.forRoot()
  ],
  providers: [
    SkyContribLocaleService,
    LocalizationConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initLocalization,
      deps: [LocalizationConfig],
      multi: true
    }
  ]
})
export class SkyContribLocaleModule {}
