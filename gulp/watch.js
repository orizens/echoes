var gulp = require('gulp');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

module.exports = gulp.task('watch', function() {
  
  gulp.watch(['src/**/*.js', '!src/bundle.js'], function() {
    runSequence('build');
  });

  gulp.watch(['src/**/*.less'], function () {
  	runSequence(['style', 'assets']);
  });
  gulp.watch('src/**/*.html', ['html2js']);

});