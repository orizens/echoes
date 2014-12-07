var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gulp = require('gulp');
var runSequence = require('run-sequence');

// require external tasks
require('./gulp/concat.js');
require('./gulp/server.js');
// require('./gulp/test.js');
require('./gulp/watch.js');
require('./gulp/style.js');

//configure grunt
var configs = {
	paths: {
		files: {
			js: ['./src/app/**/*.js', '!./src/app/bundle.js']
		},
		build: {
			js: 'bundle.js'
		}
	}
};

gulp.task('lint', function() {
  return gulp.src(configs.paths.files.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('serve', function (callback) {
  runSequence(
    'build',
    'style',
    'webserver',
    'watch'
  );
});

var karma = require('karma').server;

/**
 * Run test once and exit
 */
module.exports = gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
});
var copy = require('gulp-copy');
gulp.task('copy', function(){
  return gulp.src([
    'src/BACKBONE/modules/**/*.less',
    'src/BACKBONE/views/**/*.less'
  ])
  .pipe(gulp.dest('src/css/v2'));
});