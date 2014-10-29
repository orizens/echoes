var gulp = require('gulp');
var karma = require('karma').server;

/**
 * Run test once and exit
 */
module.exports = gulp.task('test', function (done) {
  karma.start({
    configFile: global.project_dir + '/karma.conf.js',
    singleRun: false
  }, done);
});
