import gulp from 'gulp';
import webserver from 'gulp-webserver';

gulp.task('webserver', () => {
  gulp.src([
  	'src',
  	'.tmp'
  	])
    .pipe(webserver({
      livereload: true,
      // directoryListing: true,
      // open: true,
      port: 9001
    }));
});

gulp.task('server:dist', () => {
  gulp.src([
    'dist'
    ])
    .pipe(webserver({
      livereload: true,
      // directoryListing: true,
      // open: true,
      port: 9002
    }));
});