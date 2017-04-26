describe('tree view component', function () {
  'use strict';

  it('should display tree view with checkbox', function () {
    return browser
      .setupTest('/tree-view.html')
      .compareScreenshot({
        screenshotName: 'tree-view',
        selector: '#screenshot-tree-view'
      });
  });
});
