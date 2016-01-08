var isDebug = process.env.DEBUG || false;
var isTravis = process.env.TRAVIS || false;
var browsers = isTravis ? [ 'PhantomJS' ] : [isDebug ? 'Chrome' : 'PhantomJS2'];
var options = {
	basePath: './src',
	browsers: browsers,
	frameworks: ['browserify', 'jasmine'],
	files: [
		'../.tmp/bundle-bfy.js',
		'../bower_components/angular-mocks/angular-mocks.js',
		'core/**/*spec.js',
		'../tests/mocks/**/*mock.json'
    ],
    autoWatch: true,
    singleRun: true,
    preprocessors: {
        '../tests/mocks/**/*mock.json': ['json_fixtures'],
        'app/**/*spec.js': ['babel'],
        'app/**/*spec.js': [ 'browserify' ]
        // 'app/bundle.js': ['coverage']
    },
    browserify: {
      debug: true,
      plugin: [ 'babelify' ]
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      }
    },
    jsonFixturesPreprocessor: {
      // strip this from the file path \ fixture name
      stripPrefix: '.+mocks/',
      // strip this to the file path \ fixture name
      // prependPrefix: 'mock/',
      // change the global fixtures variable name
      variableName: 'mocks'
    },
    plugins : [
        'karma-phantomjs2-launcher',
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-ng-html2js-preprocessor',
        // 'karma-html-reporter',
        // 'karma-spec-reporter',
        'karma-mocha-reporter',
        'karma-json-fixtures-preprocessor',
        'karma-babel-preprocessor',
        'karma-browserify'
        // 'karma-browserstack-launcher'
        // 'karma-coverage'
    ],
    reporters: [
    	// 'progress',
    	// 'html',
    	// 'dots',
    	// 'spec',
    	// 'coverage',
    	'mocha'
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

var browserStackOptions = {
    // global config of your BrowserStack account
    browserStack: {
      username: process.env.bs_user,
      accessKey: process.env.bs_key
    },

    // define browsers
    customLaunchers: {
      bs_chrome_mac: {
        base: 'BrowserStack',
        browser: 'chrome',
        browser_version: '39.0',
        os: 'OS X',
        os_version: 'Mountain Lion'
      },
      bs_chrome_windows: {
      	base: 'BrowserStack',
        browser : 'chrome',
		browser_version : '39.0',
		os : 'Windows',
		os_version : '8'
      }
    },

    browsers: ['bs_chrome_mac', 'bs_chrome_windows']
};

module.exports = function(config) {
	var client_dir = '';

	// if (isTravis) {
	// 	Object.keys(browserStackOptions).forEach(function (key) {
	// 		options[key] = browserStackOptions[key];
	// 	});
	// }
	config.set(options);
};