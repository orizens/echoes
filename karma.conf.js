var isDebug = process.env.DEBUG || false;
var isTravis = process.env.TRAVIS || false;
var browsers = isTravis ? [ 'PhantomJS' ] : [isDebug ? 'Chrome' : 'PhantomJS2'];
var options = {
	basePath: './src',
	browsers: browsers,
	frameworks: ['browserify', 'jasmine', 'es6-shim'],
	files: [
    '../.tmp/vendors.js',
		'../.tmp/bundle.js',
		'../node_modules/angular-mocks/angular-mocks.js',
		'core/**/*spec.js',
    'components/youtube-videos/**/*spec.js',
    'components/navigator/**/*spec.js',
    'components/playlist-viewer/**/*spec.js',
		'../tests/mocks/**/*mock.json'
    ],
    autoWatch: true,
    singleRun: true,
    preprocessors: {
        '../tests/mocks/**/*mock.json': ['json_fixtures'],
        '**/*spec.js': ['browserify']
        // 'app/bundle.js': ['coverage']
    },
    browserify: {
      debug: true,
      transform: ['babelify', 'stringify' ]
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
        // 'karma-html-reporter',
        // 'karma-spec-reporter',
        'karma-mocha-reporter',
        'karma-clear-screen-reporter',
        'karma-json-fixtures-preprocessor',
        'karma-babel-preprocessor',
        'karma-browserify',
        'karma-es6-shim'
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
	// if (isTravis) {
	// 	Object.keys(browserStackOptions).forEach(function (key) {
	// 		options[key] = browserStackOptions[key];
	// 	});
	// }
	config.set(options);
};