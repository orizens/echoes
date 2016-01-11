import gulp from 'gulp';

gulp.task('build', ['browserify'], () => {});

gulp.task('assets', () => {
  return gulp.src([
    'node_modules/font-awesome/fonts/*.*',
    'node_modules/bootstrap/fonts/*.*'
    ])
    .pipe(gulp.dest('.tmp/fonts/'));
});

gulp.task('concat', ['concat:vendors', 'html2js']);