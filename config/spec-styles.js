require('font-awesome-webpack');
require('style-loader!../src/scss/sky/sky.scss');

var FontFaceObserver = require('fontfaceobserver');
var stylesAreLoaded = false;

var styleLoader = {
  loadStyles: function (callback) {
    var openSans = new FontFaceObserver('Open Sans'),
      oswald = new FontFaceObserver('Oswald'),
      promise;

    promise = Promise.all(
      [
        openSans.load(),
        oswald.load()
      ]
    );

    promise.then(function () {
      stylesAreLoaded = true;
    });

    return promise;
  },

  stylesAreLoaded: function () {
    return stylesAreLoaded;
  }
};

(function () {
  beforeAll(function (done) {
    styleLoader.loadStyles().then(done);
  });
}());
