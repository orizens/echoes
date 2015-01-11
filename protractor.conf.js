exports.config = {
	capabilities: {
		// 'browserName': 'phantomjs',
		'browserName': 'chrome',
	},
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['tests/e2e/search-videos-spec.js'],
	chromeOnly: true
};