exports.config = {
	capabilities: {
		// 'browserName': 'phantomjs',
		'browserName': 'chrome',
	},
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['tests/e2e/*spec.js'],
	directConnect: true
};