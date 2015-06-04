var gulp = require('gulp');
var protractorRunner = require('wt-protractor-runner');

module.exports = gulp.task('test:e2e', function testE2e(done) {
    // Load config
	var config = require('./config/config.protractor')();
    // Run tests
    protractorRunner(config)(done);

})