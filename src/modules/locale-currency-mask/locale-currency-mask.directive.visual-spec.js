describe('locale currency mask', function () {
  'use strict';

  it('should display input with currency mask', function () {
    return browser
      .setupTest('/locale-currency-mask.html')
      .compareScreenshot({
        screenshotName: 'locale-currency-mask',
        selector: '#screenshot-locale-currency-mask'
      });
  });
});
