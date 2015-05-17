exports.config = {
	capabilities: {
		// 'browserName': 'phantomjs',
		'browserName': 'chrome',
	},
	// 'phantomjs.binary.path': require('phantomjs').path,
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['tests/e2e/*spec.js'],
	directConnect: true
};