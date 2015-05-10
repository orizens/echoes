var isDebug = process.env.DEBUG || false;
var browsers = [isDebug ? 'Chrome' : 'PhantomJS'];

module.exports = function(config) {
	var client_dir = '';

	config.set({
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
	        moduleName: 'templates'
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
	        'karma-json-fixtures-preprocessor'
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
  });
};