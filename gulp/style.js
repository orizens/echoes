var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var uncss = require('gulp-uncss');
var glob = require('glob');

gulp.task('style', function () {
  return gulp.src([
  		'./src/css/style.less'
  	])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    // .pipe(uncss({
    //     html: glob.sync('./src/app/**/*.html').concat('./src/index.html'),
    //     ignore: [/^(\.show\-description)+.*|(fa).*|(active)|(\.open)/]
    // }))
    .pipe(gulp.dest('./src/css'));
});