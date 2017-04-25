import {
  TestBed,
  async
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SkyLocaleCurrencyMaskModule } from './';
import { LocaleCurrencyMaskDefaultTestComponent } from
  './fixtures/locale-currency-mask-default-options.component.fixture';

describe('Locale currency mask directive', () => {

  describe('Populated Fixture', () => {
    let component: LocaleCurrencyMaskDefaultTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          LocaleCurrencyMaskDefaultTestComponent
        ],
        imports: [
          SkyLocaleCurrencyMaskModule
        ]
      });

      fixture = TestBed.createComponent(LocaleCurrencyMaskDefaultTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();

    }));

    it('should show title and description for rows', () => {
      console.log(element);
    });
  });
});
