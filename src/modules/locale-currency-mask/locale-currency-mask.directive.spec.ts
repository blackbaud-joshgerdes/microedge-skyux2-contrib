import {
  TestBed,
  async
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SkyContribLocaleCurrencyMaskModule } from './';
import { SkyContribLocaleCurrencyMaskDirective } from './';

import { LocaleCurrencyMaskFixturesModule } from
  './fixtures/locale-currency-mask-fixtures.module';
import { LocaleCurrencyMaskDefaultTestComponent } from
  './fixtures/locale-currency-mask-default-options.component.fixture';

describe('Locale currency mask directive', () => {
  describe('Default Fixture', () => {
    let component: LocaleCurrencyMaskDefaultTestComponent,
        fixture: any,
        nativeElement: HTMLElement,
        element: DebugElement,
        directiveInstance: any;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          LocaleCurrencyMaskFixturesModule
        ]
      });
      fixture = TestBed.createComponent(LocaleCurrencyMaskDefaultTestComponent);
      nativeElement = fixture.nativeElement as HTMLElement;
      element = fixture.debugElement as DebugElement;
      component = fixture.componentInstance;
      const directiveEl = element.query(By.directive(SkyContribLocaleCurrencyMaskDirective));
      directiveInstance = directiveEl.injector.get(SkyContribLocaleCurrencyMaskDirective);

      fixture.detectChanges();

    }));

    // Directive tests
    const eventsToTest = [
      {event: 'cut', inputFunctionStr: 'handleCut', runChromeAndroid: false},
      {event: 'input', inputFunctionStr: 'handleInput', runChromeAndroid: true},
      {event: 'keydown', inputFunctionStr: 'handleKeydown', runChromeAndroid: false},
      {event: 'keypress', inputFunctionStr: 'handleKeypress', runChromeAndroid: false},
      {event: 'paste', inputFunctionStr: 'handlePaste', runChromeAndroid: false}
    ];

    it('should call proper functions on specified events and its not chrome android', () => {
      spyOn(directiveInstance, 'isChromeAndroid').and.returnValue(false);

      for (let i = 0; i < eventsToTest.length; i++) {
        spyOn(directiveInstance, eventsToTest[i].inputFunctionStr).and.callThrough();
        spyOn(directiveInstance.inputHandler, eventsToTest[i].inputFunctionStr).and.callThrough();
        directiveInstance.registerOnChange(function(){ return; });

        let inputElement = element.query(
          By.css('input')
        ).nativeElement;

        inputElement.dispatchEvent(new Event(eventsToTest[i].event));
        expect(directiveInstance[eventsToTest[i].inputFunctionStr]).toHaveBeenCalled();

        if (eventsToTest[i].runChromeAndroid) {
          expect(directiveInstance.inputHandler[eventsToTest[i].inputFunctionStr]).not.toHaveBeenCalled();
        } else {
          expect(directiveInstance.inputHandler[eventsToTest[i].inputFunctionStr])
            .toHaveBeenCalled();
        }
      }
    });

    it('should call proper functions on specified events and it is chrome android', () => {
      spyOn(directiveInstance, 'isChromeAndroid').and.returnValue(true);

      for (let i = 0; i < eventsToTest.length; i++) {
        spyOn(directiveInstance, eventsToTest[i].inputFunctionStr).and.callThrough();
        spyOn(directiveInstance.inputHandler, eventsToTest[i].inputFunctionStr).and.callThrough();
        directiveInstance.registerOnChange(function(){ return; });

        let inputElement = element.query(
          By.css('input')
        ).nativeElement;

        inputElement.dispatchEvent(new Event(eventsToTest[i].event));
        expect(directiveInstance[eventsToTest[i].inputFunctionStr]).toHaveBeenCalled();

        if (eventsToTest[i].runChromeAndroid) {
          expect(directiveInstance.inputHandler[eventsToTest[i].inputFunctionStr])
            .toHaveBeenCalled();
        } else {
          expect(directiveInstance.inputHandler[eventsToTest[i].inputFunctionStr]).not.toHaveBeenCalled();
        }
      }
    });

    it('should return true for isChromeAndroid if the useragent contains both chrome and android',
      () => {
      (<any>navigator)['__defineGetter__']('userAgent', function(){
        return 'chromeandroid';
      });

      expect(directiveInstance.isChromeAndroid()).toBeTruthy();
    });

    it('should return false for isChromeAndroid if the useragent doesnt contain chrome',
      () => {
      (<any>navigator)['__defineGetter__']('userAgent', function(){
        return 'somebodyoncetoldmetheworldwasgonnarollme';
      });

      expect(directiveInstance.isChromeAndroid()).toBeFalsy();
    });

    it('should passthrough registerOnTouched', () => {
      spyOn(directiveInstance.inputHandler, 'setOnModelTouched').and.callThrough();

      const callbackFunction = () => {};
      directiveInstance.registerOnTouched(callbackFunction);
      expect(directiveInstance.inputHandler.setOnModelTouched)
        .toHaveBeenCalledWith(callbackFunction);
    });

    it('should set elements disabled to what you pass to setDisabledState', () => {
      let inputElement = element.query(
        By.css('input')
      ).nativeElement;

      directiveInstance.setDisabledState(true);
      expect(inputElement.disabled).toBeTruthy();
      directiveInstance.setDisabledState(false);
      expect(inputElement.disabled).toBeFalsy();
    });

    it('should passthrough writeValue', () => {
      spyOn(directiveInstance.inputHandler, 'setValue').and.callThrough();

      directiveInstance.writeValue(5);
      expect(directiveInstance.inputHandler.setValue).toHaveBeenCalledWith(5);
    });

    it('should default to en-US if the locale is not supported', () => {
      expect(directiveInstance.formatLocale('es_US')).toBe('es-US');
      expect(directiveInstance.formatLocale('sdfsdf')).toBe('en-US');
    });

    // input handler tests
    it('should handle input with various value sets', () => {
      directiveInstance.inputHandler.setOnModelChange(() => {return; });
      spyOn(directiveInstance, 'isChromeAndroid').and.returnValue(true);
      spyOn(directiveInstance.inputHandler, 'onModelChange').and.callThrough();
      spyOn(directiveInstance.inputHandler, 'setCursorPosition').and.callThrough();
      spyOn(directiveInstance.inputHandler.inputService, 'addNumber').and.callThrough();

      let inputElement = element.query(
        By.css('input')
      ).nativeElement;

      // undefined rawValue
      directiveInstance.inputHandler.handleInput({target: inputElement});

      expect(directiveInstance.inputHandler.setCursorPosition).not.toHaveBeenCalled();
      expect(directiveInstance.inputHandler.onModelChange).not.toHaveBeenCalled();
      expect(directiveInstance.inputHandler.inputService.addNumber).not.toHaveBeenCalled();

      directiveInstance.inputHandler.setCursorPosition.calls.reset();
      directiveInstance.inputHandler.onModelChange.calls.reset();
      directiveInstance.inputHandler.inputService.addNumber.calls.reset();

      inputElement.value = 1;
      directiveInstance.inputHandler.handleInput({target: inputElement});
      expect(directiveInstance.inputHandler.setCursorPosition).toHaveBeenCalled();
      expect(directiveInstance.inputHandler.onModelChange).toHaveBeenCalled();
      expect(directiveInstance.inputHandler.inputService.addNumber).toHaveBeenCalledWith('1'.charCodeAt(0));
      expect(directiveInstance.inputHandler.inputService.canInputMoreNumbers).toBeTruthy();

      directiveInstance.inputHandler.setCursorPosition.calls.reset();
      directiveInstance.inputHandler.onModelChange.calls.reset();
      directiveInstance.inputHandler.inputService.addNumber.calls.reset();

      // no model change if event fires without a value change
      directiveInstance.inputHandler.handleInput({target: inputElement});
      expect(directiveInstance.inputHandler.setCursorPosition).toHaveBeenCalled();
      expect(directiveInstance.inputHandler.onModelChange).not.toHaveBeenCalled();

      directiveInstance.inputHandler.setCursorPosition.calls.reset();
      directiveInstance.inputHandler.onModelChange.calls.reset();

      // delete a value
      spyOn(directiveInstance.inputHandler.inputService, 'removeNumber').and.callThrough();
      directiveInstance.inputHandler.inputService.rawValue = '$1.23';
      inputElement.value = '$1.2';
      directiveInstance.inputHandler.handleInput({target: inputElement});
      expect(directiveInstance.inputHandler.inputService.removeNumber).toHaveBeenCalledWith(8);

      // special keyCode handling
      spyOn(directiveInstance.inputHandler.inputService, 'changeToPositive').and.callThrough();
      spyOn(directiveInstance.inputHandler.inputService, 'changeToNegative').and.callThrough();

      directiveInstance.inputHandler.inputService.rawValue = '$1.23';
      inputElement.value = '$1.23' + String.fromCharCode(43);
      directiveInstance.inputHandler.handleInput({target: inputElement});
      expect(directiveInstance.inputHandler.inputService.changeToPositive).toHaveBeenCalled();
      expect(directiveInstance.inputHandler.inputService.changeToNegative).not.toHaveBeenCalled();

      directiveInstance.inputHandler.inputService.changeToPositive.calls.reset();
      directiveInstance.inputHandler.inputService.changeToNegative.calls.reset();

      directiveInstance.inputHandler.inputService.rawValue = '$1.23';
      inputElement.value = '$1.23' + String.fromCharCode(45);
      directiveInstance.inputHandler.handleInput({target: inputElement});
      expect(directiveInstance.inputHandler.inputService.changeToPositive).not.toHaveBeenCalled();
      expect(directiveInstance.inputHandler.inputService.changeToNegative).toHaveBeenCalled();

      directiveInstance.inputHandler.inputService.addNumber.calls.reset();
      directiveInstance.inputHandler.setCursorPosition.calls.reset();
      directiveInstance.inputHandler.onModelChange.calls.reset();

      // Max Numbers
      directiveInstance.inputHandler.inputService.rawValue = '$1.23';
      inputElement.value = '$1.234';
      inputElement.maxLength = 5;

      directiveInstance.inputHandler.handleInput({target: inputElement});
      expect(directiveInstance.inputHandler.inputService.canInputMoreNumbers).toBeFalsy();
      expect(directiveInstance.inputHandler.inputService.addNumber).not.toHaveBeenCalled();
      expect(directiveInstance.inputHandler.setCursorPosition).not.toHaveBeenCalled();
      expect(directiveInstance.inputHandler.onModelChange).not.toHaveBeenCalled();

      directiveInstance.inputHandler.inputService.addNumber.calls.reset();
      directiveInstance.inputHandler.setCursorPosition.calls.reset();
      directiveInstance.inputHandler.onModelChange.calls.reset();
    });

    it('should handle keyDown events', () => {
      directiveInstance.inputHandler.setOnModelChange(() => {return; });

      let fakeEvent = {
        keyCode: '1'.charCodeAt(0),
        preventDefault : jasmine.createSpy('preventDefault')
      };

      directiveInstance.inputHandler.handleKeydown(fakeEvent);
      expect(fakeEvent.preventDefault).not.toHaveBeenCalled();

      fakeEvent.preventDefault.calls.reset();

      fakeEvent.keyCode = 8;
      directiveInstance.inputHandler.handleKeydown(fakeEvent);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();

      fakeEvent.preventDefault.calls.reset();

      // delete a value with a special character
      spyOn(directiveInstance.inputHandler.inputService, 'removeNumber').and.callThrough();
      fakeEvent.keyCode = 46;
      directiveInstance.inputHandler.handleKeydown(fakeEvent);
      expect(directiveInstance.inputHandler.inputService.removeNumber).toHaveBeenCalledWith(46);
    });

    it('should handle keypress events', () => {
      directiveInstance.inputHandler.setOnModelChange(() => {return; });

      let inputElement = element.query(
        By.css('input')
      ).nativeElement;

      let fakeEvent = {
        keyCode: '1'.charCodeAt(0),
        preventDefault : jasmine.createSpy('preventDefault'),
        target: inputElement
      };

      spyOn(directiveInstance.inputHandler.inputService, 'addNumber').and.callThrough();
      spyOn(directiveInstance.inputHandler, 'onModelChange').and.callThrough();

      directiveInstance.inputHandler.handleKeypress(fakeEvent);
      expect(directiveInstance.inputHandler.inputService.addNumber).toHaveBeenCalledWith(fakeEvent.keyCode);
      expect(fakeEvent.preventDefault).toHaveBeenCalled();
      expect(directiveInstance.inputHandler.onModelChange).toHaveBeenCalled();

      directiveInstance.inputHandler.inputService.addNumber.calls.reset();
      fakeEvent.preventDefault.calls.reset();
      directiveInstance.inputHandler.onModelChange.calls.reset();

      spyOn(directiveInstance.inputHandler.inputService, 'changeToPositive').and.callThrough();
      spyOn(directiveInstance.inputHandler.inputService, 'changeToNegative').and.callThrough();

      fakeEvent.keyCode = 43;
      directiveInstance.inputHandler.handleKeypress(fakeEvent);
      expect(directiveInstance.inputHandler.inputService.changeToPositive).toHaveBeenCalled();
      expect(directiveInstance.inputHandler.inputService.changeToNegative).not.toHaveBeenCalled();

      directiveInstance.inputHandler.inputService.changeToPositive.calls.reset();
      directiveInstance.inputHandler.inputService.changeToNegative.calls.reset();

      fakeEvent.keyCode = 45;
      directiveInstance.inputHandler.handleKeypress(fakeEvent);
      expect(directiveInstance.inputHandler.inputService.changeToPositive).not.toHaveBeenCalled();
      expect(directiveInstance.inputHandler.inputService.changeToNegative).toHaveBeenCalled();

      directiveInstance.inputHandler.inputService.addNumber.calls.reset();

      // all digits
      fakeEvent.keyCode = 49; // digit

      directiveInstance.inputHandler.inputService.rawValue = '123456';
      inputElement.value = '1234567';
      inputElement.selectionStart = 0;
      inputElement.selectionEnd = 7;

      directiveInstance.inputHandler.handleKeypress(fakeEvent);
      expect(directiveInstance.inputHandler.inputService.canInputMoreNumbers).toBeTruthy();
      expect(directiveInstance.inputHandler.inputService.addNumber).toHaveBeenCalled();
    });

    it('should passthrough updateOptions from the handler to the service', () => {
      spyOn(directiveInstance.inputHandler.inputService, 'updateOptions');
      directiveInstance.inputHandler
        .updateOptions('tlh-KX', 'T', false); // negative currency is not honorable
      expect(directiveInstance.inputHandler.inputService.updateOptions).toHaveBeenCalled();
    });

    it('should return the model change callback from the handler', () => {
      const callbackFn = () => { return; };
      directiveInstance.inputHandler.setOnModelChange(callbackFn);
      expect(directiveInstance.inputHandler.getOnModelChange()).toBe(callbackFn);
    });

    it('should return the model touched callback from the handler', () => {
      const callbackFn = () => { return; };
      directiveInstance.inputHandler.setOnModelTouched(callbackFn);
      expect(directiveInstance.inputHandler.getOnModelTouched()).toBe(callbackFn);
    });

    it('should apply the mask to 0 if there is no rawValue', () => {
      spyOn(directiveInstance.inputHandler.inputService, 'applyMask').and.callThrough();
      directiveInstance.inputHandler.inputService.addNumber('1'.charCodeAt(0));
      expect(directiveInstance.inputHandler.inputService.applyMask)
        .toHaveBeenCalledWith(false, '0');
    });

    it('should append a - after change to negative', () => {
      directiveInstance.inputHandler.updateOptions('en-US', 'USD', true);
      directiveInstance.inputHandler.inputService.rawValue = '1.23';
      directiveInstance.inputHandler.inputService.value = '1.23';

      directiveInstance.inputHandler.inputService.changeToNegative();
      expect(directiveInstance.inputHandler.inputService.rawValue).toBe('-$1.23');
    });
  });
});
