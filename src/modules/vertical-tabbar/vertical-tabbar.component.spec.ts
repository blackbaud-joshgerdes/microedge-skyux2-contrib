import {
  TestBed,
  async
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SkyContribVerticalTabbarModule } from '../vertical-tabbar';
import { VerticalTabbarTestComponent } from './fixtures/vertical-tabbar.component.fixture';
import {
  VerticalTabbarNoSelectTestComponent
} from './fixtures/vertical-tabbar-no-select.component.fixture';
import {
  VerticalTabbarNoTitleTestComponent
} from './fixtures/vertical-tabbar-no-title.component.fixture';
import {
  VerticalTabbarEmptyTestComponent
} from './fixtures/vertical-tabbar-empty.component.fixture';

describe('Vertical Tabbar Component', () => {
  describe('Populated Fixture', () => {
    let component: VerticalTabbarTestComponent,
      fixture: any,
      nativeElement: HTMLElement,
      element: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          VerticalTabbarTestComponent
        ],
        imports: [
          SkyContribVerticalTabbarModule
        ]
      });

      fixture = TestBed.createComponent(VerticalTabbarTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
      fixture.detectChanges();
    }));

    it('should display 4 items', () => {
      expect(element.queryAll(By.css('.sky-contrib-vertical-tabbar-menu li')).length).toBe(4);
    });

    it('should set proper item labels', () => {
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[0].nativeElement.innerHTML).toEqual('Tab One');
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[1].nativeElement.innerHTML).toEqual('Tab Two');
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[2].nativeElement.innerHTML).toEqual('Tab Three');
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[3].nativeElement.innerHTML)
        .toEqual('Tab Four - A very long title that seems to go on forever');
    });

    it('should set proper item active', () => {
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[1].classes['active']).toBeTruthy();
    });

    it('should set proper item disabled', () => {
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[3].attributes['disabled']).toBeTruthy();
    });

    it('should not change active on clicking current active', () => {
      element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[1].nativeElement.click();
      fixture.detectChanges();
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[1].classes['active']).toBeTruthy();
    });

    it('should not change active on clicking disabled', () => {
      element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[3].nativeElement.click();
      fixture.detectChanges();
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[1].classes['active']).toBeTruthy();
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[3].classes['active']).toBeFalsy();
    });

    it('should change active on click', () => {
      expect(element.query(
        By.css('.sky-contrib-vertical-tabbar-content div.active')
      ).nativeElement.innerHTML.trim()).toEqual('TAB TWO CONTENT');
      element.queryAll(By.css('.sky-contrib-vertical-tabbar-menu li a'))[0].nativeElement.click();
      fixture.detectChanges();
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[0].classes['active']).toBeTruthy();
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[1].classes['active']).toBeFalsy();
      expect(element.query(
        By.css('.sky-contrib-vertical-tabbar-content div.active')
      ).nativeElement.innerHTML.trim()).toEqual('TAB ONE CONTENT');
    });
  });

  describe('No Select Fixture', () => {
    let component: VerticalTabbarNoSelectTestComponent,
      fixture: any,
      nativeElement: HTMLElement,
      element: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          VerticalTabbarNoSelectTestComponent
        ],
        imports: [
          SkyContribVerticalTabbarModule
        ]
      });

      fixture = TestBed.createComponent(VerticalTabbarNoSelectTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
      fixture.detectChanges();
    }));

    it('should set first item active', () => {
      expect(element.query(
        By.css('.sky-contrib-vertical-tabbar-content div.active')
      ).nativeElement.innerHTML.trim()).toEqual('TAB ONE CONTENT');
      expect(element.queryAll(
        By.css('.sky-contrib-vertical-tabbar-menu li a')
      )[0].classes['active']).toBeTruthy();
    });
  });

  describe('No Title Fixture', () => {
    let component: VerticalTabbarNoTitleTestComponent,
      fixture: any,
      nativeElement: HTMLElement,
      element: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          VerticalTabbarNoTitleTestComponent
        ],
        imports: [
          SkyContribVerticalTabbarModule
        ]
      });

      fixture = TestBed.createComponent(VerticalTabbarNoTitleTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
    }));

    it('should throw error if no title', () => {
      expect(() => fixture.detectChanges()).toThrow();
    });
  });

  describe('Empty Fixture', () => {
    let component: VerticalTabbarEmptyTestComponent,
      fixture: any,
      nativeElement: HTMLElement,
      element: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          VerticalTabbarEmptyTestComponent
        ],
        imports: [
          SkyContribVerticalTabbarModule
        ]
      });

      fixture = TestBed.createComponent(VerticalTabbarEmptyTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('should display no items', () => {
      expect(element.queryAll(By.css('.sky-contrib-vertical-tabbar-menu li')).length).toBe(0);
    });
  });
});
