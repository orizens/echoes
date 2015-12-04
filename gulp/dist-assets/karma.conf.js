var isDebug = process.env.DEBUG || false;
var isTravis = process.env.TRAVIS || false;
var browsers = isTravis ? [ 'PhantomJS' ] : [isDebug ? 'Chrome' : 'PhantomJS2'];

module.exports = function(config) {
	var client_dir = '';

	config.set({
		// basePath: './',
		browsers: browsers,
		frameworks: ['jasmine'],
		files: [
			'vendors.js',
			'angular-mocks.js',
			
			'bundle.js',
			'templates.mdl.js',
			'specs/**/*spec.js',
			'tests/mocks/**/*mock.json'
	    ],
	    autoWatch: true,
	    singleRun: true,
        preprocessors: {
	        'tests/mocks/**/*mock.json': ['json_fixtures'],
	        'specs/**/*spec.js': ['babel']
	        // 'app/bundle.js': ['coverage']
	        // 'common/**/*.html': ['ng-html2js']
	    },
	    jsonFixturesPreprocessor: {
	      // strip this from the file path \ fixture name
	      stripPrefix: '.+mocks/',
	      // strip this to the file path \ fixture name
	      // prependPrefix: 'mock/',
	      // change the global fixtures variable name
	      variableName: 'mocks'
	    },
	    babelPreprocessor: {
	      options: {
	      	presets: ['es2015'],
	        sourceMap: 'inline'
	      }
	    },
	    plugins : [
	        'karma-phantomjs-launcher',
	        'karma-phantomjs2-launcher',
	        'karma-chrome-launcher',
	        'karma-jasmine',
	        'karma-mocha-reporter',
	        'karma-json-fixtures-preprocessor',
	        'karma-babel-preprocessor'
	    ],
	    reporters: [
	    	'mocha'
    	]
  });
};