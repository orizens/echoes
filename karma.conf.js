module.exports = function(config) {
	var client_dir = '';

	config.set({
		basePath: './src',
		browsers: ['Chrome'],
		// browsers: ['PhantomJS'],
		frameworks: ['jasmine'],
		files: [
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/angular/angular.js',
			'bower_components/bootstrap/dist/js/bootstrap.min.js',
			
			'bower_components/angular-mocks/angular-mocks.js',
			"bower_components/angular-route/angular-route.js",
			"bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
			'bower_components/angular-resource/angular-resource.js',
			
			'app/**/*.html',
			// 'common/**/*.html',
			'app/bundle.js',
			'app/**/*spec.js'
			// 'common/**/*spec.js'
	    ],
	    autoWatch: true,
        preprocessors: {
	        'app/**/*.html': ['ng-html2js']
	        // 'common/**/*.html': ['ng-html2js']
	    },
	    ngHtml2JsPreprocessor: {
	        moduleName: 'templates'
	    },
	    plugins : [
	        'karma-phantomjs-launcher',
	        'karma-chrome-launcher',
	        'karma-jasmine',
	        'karma-ng-html2js-preprocessor'
	    ]
  });
};