var gulp = require('gulp');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

module.exports = gulp.task('watch', function() {
  
  gulp.watch(['src/**/*.js', '!src/bundle.js'], function() {
    // runSequence('build', livereload.changed);
    runSequence('build');
  });

  gulp.watch(['src/css/**/*.less'], ['style']).on('change', livereload.changed);
  // gulp.watch('src/**/*.html', livereload.changed);

});