var gulp = require('gulp');
// var nodemon = require('gulp-nodemon');
// var livereload = require('gulp-livereload');
var webserver = require('gulp-webserver');

// module.exports = gulp.task('webserver', function() {
// 	gulp.src('src')
// 	.pipe(webserver({
// 		livereload: true,
// 		open: true,
// 		port: 9001
// 	}));
// });

var server = require('gulp-server-livereload');
 
gulp.task('webserver', function() {
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