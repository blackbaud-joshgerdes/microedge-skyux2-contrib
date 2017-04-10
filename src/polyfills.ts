import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

if (!global.Intl) {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}
