var gulp = require('gulp');
var karma = require('karma').server;
var isTravis = process.env.TRAVIS || false;
var pathToKarmaConf = __dirname;
var webserver = require('gulp-webserver');

gulp.task('test', function (done) {
  karma.start({
    configFile: pathToKarmaConf + '/karma.conf.js',
    singleRun: isTravis
  }, done);
});

gulp.task('copy:dist', ['copy:specs', 'copy:tests'], function () {
  return gulp.src([
    'dist/*/**.*',
    'dist/*.*'
  ])
  .pipe(gulp.dest('./'));
})

gulp.task('copy:specs', function () {
  return gulp.src([
    'dist/specs/*/**'
  ])
  .pipe(gulp.dest('./specs'));
})

gulp.task('copy:tests', function () {
  return gulp.src([
    'dist/tests/*/**'
  ])
  .pipe(gulp.dest('./tests'));
})

gulp.task('serve', function() {
  gulp.src([
    './',
    '.tmp'
    ])
    .pipe(webserver({
      livereload: true,
      // directoryListing: true,
      // open: true,
      port: 9001
    }));
})