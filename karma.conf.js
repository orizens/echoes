'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// let webpackConfig = require('./webpack.config.js');
// webpackConfig.entry = {};
const isDebug = process.env.DEBUG || false;
const isTravis = process.env.TRAVIS || false;
const KARMA_SINGLE_RUN_FLAG = process.argv.filter(s => s.includes('single-run'));
const RUN_ONCE = process.env.BDD || isDebug ? false : KARMA_SINGLE_RUN_FLAG ?
  true : false;
const browsers = isTravis ? ['PhantomJS'] : [isDebug ? 'Chrome' : 'PhantomJS'];

const options = {
  basePath: '',
  browsers: browsers,
  frameworks: ['jasmine'],
  autoWatch: true,
  singleRun: RUN_ONCE,
  files: [
    // '../node_modules/angular/angular.js',
    'specs.bundle.js'
    // 'core/index.js',
    // 'core/**/*spec.js',
    // '../node_modules/angular-mocks/angular-mocks.js',
    // 'components/youtube-videos/index.js',
    // 'components/youtube-videos/**/*spec.js',
    // 'components/navigator/**/*spec.js',
    // 'components/playlist-viewer/**/*spec.js',
    // 'components/search-filter-panel/**/*spec.js',
  ],
  preprocessors: {
    // '**/*spec.js': ['webpack'],
    // '**/*.js': ['webpack']
    'specs.bundle.js': ['webpack', 'sourcemap']
  },
  webpack: {
    devtool: 'inline-source-map',
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: ['babel']
      }, {
        test: /\.html$/,
        loader: 'ngtemplate!html',
        exclude: /(index)/
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!' +
          'less?sourceMap')
      }]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].style.css'),
    ],
    resolve: {}
  },
  webpackMiddleware: {
    noInfo: true
  },
  plugins: [
    // 'karma-phantomjs2-launcher',
    require('karma-webpack'),
    require('karma-sourcemap-loader'),
    'karma-phantomjs-launcher',
    'karma-chrome-launcher',
    'karma-jasmine',
    // 'karma-html-reporter',
    // 'karma-spec-reporter',
    'karma-mocha-reporter',
    'karma-clear-screen-reporter'
    // require('karma-json-fixtures-preprocessor'),
    // require('karma-babel-preprocessor'),
    // 'karma-browserstack-launcher'
    // 'karma-coverage'
  ],
  reporters: [
    // 'progress',
    // 'spec',
    // 'coverage',
    'mocha',
    'clear-screen'
  ],
  mochaReporter: {
    // output: 'autowatch'
  }
  // the default configuration
  // htmlReporter: {
  //   outputDir: 'karma_html',
  //   templatePath: './node_modules/karma-html-reporter/jasmine_template.html'
  // }
};

// var browserStackOptions = {
//     // global config of your BrowserStack account
//     browserStack: {
//       username: process.env.bs_user,
//       accessKey: process.env.bs_key
//     },

//     // define browsers
//     customLaunchers: {
//       bs_chrome_mac: {
//         base: 'BrowserStack',
//         browser: 'chrome',
//         browser_version: '39.0',
//         os: 'OS X',
//         os_version: 'Mountain Lion'
//       },
//       bs_chrome_windows: {
//          base: 'BrowserStack',
//         browser : 'chrome',
//      browser_version : '39.0',
//      os : 'Windows',
//      os_version : '8'
//       }
//     },

//     browsers: ['bs_chrome_mac', 'bs_chrome_windows']
// };

module.exports = function(config) {
  // if (isTravis) {
  //  Object.keys(browserStackOptions).forEach(function (key) {
  //      options[key] = browserStackOptions[key];
  //  });
  // }
  config.set(options);
};
