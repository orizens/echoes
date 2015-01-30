module.exports = function(config) {
	var client_dir = '';

	config.set({
		basePath: './src',
		// browsers: ['Chrome'],
		browsers: ['PhantomJS'],
		frameworks: ['jasmine'],
		files: [
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/angular/angular.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js',
			
			'bower_components/angular-mocks/angular-mocks.js',
			"bower_components/angular-route/angular-route.js",
			"bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
			'bower_components/angular-resource/angular-resource.js',
			'bower_components/angular-animate/angular-animate.js',
			
			'app/**/*.html',
			// 'common/**/*.html',
			'app/bundle.js',
			'app/**/*spec.js',
			'app/**/*mock.js',
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
	        'karma-html-reporter',
	        'karma-spec-reporter',
	        'karma-mocha-reporter',
	        'karma-json-fixtures-preprocessor'
	    ],
	    reporters: [
	    	// 'progress', 
	    	// 'html',
	    	// 'dots',
	    	// 'spec',
	    	'mocha'
	    	],
	    // the default configuration
        htmlReporter: {
          outputDir: 'karma_html',
          templatePath: './node_modules/karma-html-reporter/jasmine_template.html'
        }
  });
};