module.exports = function (config) {
  'use strict';

  let testWebpackConfig = require('./webpack.test');
  let remapIstanbul = require('remap-istanbul');

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    files: [{
      pattern: './spec-bundle.js',
      watched: false
    }, {
      pattern: './spec-styles.js',
      watched: false
    }],
    preprocessors: {
      './spec-styles.js': ['webpack'],
      './spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },
    webpack: testWebpackConfig,
    coverageReporter: {
      dir: '../coverage/',
      reporters: [
        { type: 'json' },
        { type: 'html' }
      ],
      _onWriteReport: function (collector) {
        return remapIstanbul.remap(collector.getFinalCoverage());
      }
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['mocha', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    browsers: [
      'Chrome'
    ]
  });
};
