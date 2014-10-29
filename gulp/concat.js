var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

module.exports = gulp.task('build', function() {
  gulp.src([
  	'!./src/app/bundle.js',
  	'!./src/app/**/*.spec.js',

    // echoes source
    '!./src/app/collections/**/*.js',
    '!./src/app/models/**/*.js',
    '!./src/app/views/**/*.js',
    '!./src/app/modules/**/*.js',
    '!./src/app/routers/**/*.js',
    '!./src/app/libs/**/*.js',

  	'./src/app/**/*.mdl.js', 
  	'./src/app/**/*.js', 
  	])
  	.pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/app'));
});