import { Pipe, PipeTransform } from '@angular/core';
import { SkyContribTranslateService } from './translate.service';

@Pipe({name: 'skyContribTranslate'})
export class SkyContribTranslatePipe implements PipeTransform {
  constructor(
    public translationService: SkyContribTranslateService
  ) {}

  transform(value: string): string {
    return this.translationService.translate(value);
  }
}
