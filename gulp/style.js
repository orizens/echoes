var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uncss = require('gulp-uncss');
// var csso = require('gulp-csso');
// var glob = require('glob');

module.exports = gulp.task('style', function () {
  return gulp.src([
      './src/css/style.less',
      './src/app/**/*.less'
  	])
    .pipe(sourcemaps.init())
    .pipe(less())
    // .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    // .pipe(uncss({
    //     html: [ './src/app/**/*.html', './src/index.html' ],
    //     ignore: [ '.active', 'show-description', 'fa-*', 'user-signed-in',
    //               'show-youtube-player', 'fullscreen', 'yt-playing', 
    //               'transition-in', '[drawer-opened]*']
    // }))
    .pipe(gulp.dest('.tmp'));
});