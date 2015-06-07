exports.config = {
	framework: 'jasmine2',
	
	capabilities: {
		// 'browserName': 'phantomjs',
		'browserName': 'chrome',
	},
	// 'phantomjs.binary.path': require('phantomjs').path,
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['tests/e2e/*spec.js'],
	directConnect: true,

	onPrepare: function() {
		var SpecReporter = require('jasmine-spec-reporter');
		// add jasmine spec reporter
		jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
	},
	jasmineNodeOpts: {
	   print: function() {}
	}
};