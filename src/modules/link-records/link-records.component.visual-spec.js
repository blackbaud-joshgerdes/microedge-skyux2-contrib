describe('link records component', function () {
  'use strict';

  it('should display link records', function () {
    return browser
      .setupTest('/link-records.html')
      .compareScreenshot({
        screenshotName: 'link-records',
        selector: '#screenshot-link-records'
      });
  });
});
