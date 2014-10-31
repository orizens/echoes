var gulp = require('gulp');
// var nodemon = require('gulp-nodemon');
// var livereload = require('gulp-livereload');
var webserver = require('gulp-webserver');

module.exports = gulp.task('webserver', function() {
	gulp.src('src')
	.pipe(webserver({
		livereload: true,
		open: true,
		port: 9001
	}));
});