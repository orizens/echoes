exports.config = {
  capabilities: {
    'browserstack.user' : process.env.bs_user,
    'browserstack.key' : process.env.bs_key,

    // Needed for testing localhost
    'browserstack.local' : 'true',
    'browserstack.debug': 'true',

    // Settings for the browser you want to test
    'browserName' : 'Chrome',
    'browser_version' : '39.0',
    'os' : 'OS X',
    'os_version' : 'Mavericks',
    'resolution' : '1024x768'
  },
  
  framework: 'jasmine2',
  
  // Browserstack's selenium server address
  seleniumAddress: 'http://hub.browserstack.com/wd/hub',

  // Pattern for finding spec files
  specs: ['../../tests/e2e/**/*spec.js'],

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
  },

  jasmineNodeOpts: {
     print: function() {}
  }
}