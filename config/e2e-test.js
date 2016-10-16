import gulp from 'gulp';
import protractorRunner from 'wt-protractor-runner';

gulp.task('test:e2e', (done) => {
    // Load config
	var config = require('./config/config.protractor')();
    // Run tests
    protractorRunner(config)(done);

})