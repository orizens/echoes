import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('watch', () => {
  
  // gulp.watch(['src/**/*.js', '!src/bundle.js'], () => {
  //   runSequence('build');
  // });

  gulp.watch(['src/**/*.less'], () => {
  	runSequence(['style']);
  });
  // gulp.watch('src/**/*.html', ['html2js']);

});