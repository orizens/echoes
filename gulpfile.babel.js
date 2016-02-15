import gulp from 'gulp';
import runSequence from 'run-sequence';

// require external tasks
import './gulp/concat.js';
import './gulp/server.js';
import './gulp/test.js';
import './gulp/watch.js';
import './gulp/style.js';
import './gulp/dist.js';
import './gulp/e2e-test.js';
import './gulp/browserify.js';
import './gulp/dogen.js';

gulp.task('default', ['serve']);
gulp.task('serve', (callback) => {
  runSequence(
    // 'build',
    'style',
    'assets',
    'watch',
    'build:vendors',
    'browserify',
    'webserver'
  );
});