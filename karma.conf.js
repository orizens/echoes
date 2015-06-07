var isDebug = process.env.DEBUG || false;
var isTravis = process.env.TRAVIS || false;
var browsers = [isDebug ? 'Chrome' : 'PhantomJS'];
var options = {
	basePath: './src',
	browsers: browsers,
	frameworks: ['jasmine'],
	files: [
		'../.tmp/vendors.js',
		'../bower_components/angular-mocks/angular-mocks.js',
		
		'app/**/*.html',
		// 'common/**/*.html',
		'../.tmp/bundle.js',
		'../.tmp/templates.mdl.js',
		'app/**/*spec.js',
		'../tests/mocks/**/*mock.json'
		// 'common/**/*spec.js'
		// fixtures
	      // {pattern: 'app/**/*.mock.json', watched: true, served: true, included: false}
    ],
    autoWatch: true,
    singleRun: true,
    preprocessors: {
        'app/**/*.html': ['ng-html2js'],
        '../tests/mocks/**/*mock.json': ['json_fixtures']
        // 'app/bundle.js': ['coverage']
        // 'common/**/*.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
        moduleName: 'htmlTemplates'
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
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-ng-html2js-preprocessor',
        // 'karma-html-reporter',
        // 'karma-spec-reporter',
        'karma-mocha-reporter',
        'karma-json-fixtures-preprocessor',
        'karma-browserstack-launcher'
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
    // the default configuration
    htmlReporter: {
      outputDir: 'karma_html',
      templatePath: './node_modules/karma-html-reporter/jasmine_template.html'
    }
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

	if (isTravis) {
		Object.keys(browserStackOptions).forEach(function (key) {
			options[key] = browserStackOptions[key];
		});
	}
	config.set(options);
};