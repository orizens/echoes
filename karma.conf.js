var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
var isDebug = process.env.DEBUG || false;
var isTravis = process.env.TRAVIS || false;
var browsers = isTravis ? [ 'PhantomJS' ] : [isDebug ? 'Chrome' : 'PhantomJS2'];
var options = {
	basePath: './src',
	browsers: browsers,
	frameworks: ['jasmine'],
	files: [
    // '../tests/tests-files.webpack.js',
    '../node_modules/angular/angular.js',
    // './app.js',
    '../node_modules/angular-mocks/angular-mocks.js',
    'core/index.js',
		'core/**/*spec.js'
    // 'components/youtube-videos/**/*spec.js',
    // 'components/navigator/**/*spec.js',
    // 'components/playlist-viewer/**/*spec.js',
    // 'components/search-filter-panel/**/*spec.js',
		// '../tests/mocks/**/*mock.json'
    ],
    autoWatch: true,
    singleRun: true,
    preprocessors: {
        // '../tests/mocks/**/*mock.json': ['json_fixtures'],
        // '../node_modules/**/*.js': ['webpack'],
        '**/*spec.js': ['webpack'],
        '**/*.js': ['webpack']
        // '../tests/**/*.js': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        preloaders: [
          {
            test: /\.js$/,
            // exclude: /(node_modules)/,
            loaders: ['babel']
          }
        ],
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loaders: ['babel']
          },
          { test: /\.html$/, loader: 'ngtemplate!html', exclude: /(index)/ },
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css?sourceMap!' + 'less?sourceMap')
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin('[name].[chunkhash].style.css'),
      ],
      resolve: {

      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    // jsonFixturesPreprocessor: {
    //   // strip this from the file path \ fixture name
    //   stripPrefix: '.+mocks/',
    //   // strip this to the file path \ fixture name
    //   // prependPrefix: 'mock/',
    //   // change the global fixtures variable name
    //   variableName: 'mocks'
    // },
    plugins : [
        // 'karma-phantomjs2-launcher',
        // 'karma-phantomjs-launcher',
        require('karma-webpack'),
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
    	// 'html',
    	// 'dots',
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
//       	base: 'BrowserStack',
//         browser : 'chrome',
// 		browser_version : '39.0',
// 		os : 'Windows',
// 		os_version : '8'
//       }
//     },

//     browsers: ['bs_chrome_mac', 'bs_chrome_windows']
// };

module.exports = function(config) {
	// if (isTravis) {
	// 	Object.keys(browserStackOptions).forEach(function (key) {
	// 		options[key] = browserStackOptions[key];
	// 	});
	// }
	config.set(options);
};