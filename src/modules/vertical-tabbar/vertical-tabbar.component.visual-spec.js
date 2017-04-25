describe('vertical-tabbar component', function () {
  'use strict';

  it('should display vertical tabbar', function () {
    return browser
      .setupTest('/vertical-tabbar.html')
      .compareScreenshot({
        screenshotName: 'vertical-tabbar',
        selector: '#screenshot-vertical-tabbar'
      });
  });
});
