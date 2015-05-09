var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
// var uncss = require('gulp-uncss');
// var glob = require('glob');

module.exports = gulp.task('style', function () {
  console.log('compiling less..');
  return gulp.src([
      './src/css/style.less',
      './src/app/**/*.less'
  	])
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    // .pipe(uncss({
    //     html: glob.sync('./src/app/**/*.html').concat('./src/index.html'),
    //     ignore: [/^(\.show\-description)+.*|(fa).*|(active)|(\.open)/]
    // }))
    .pipe(gulp.dest('.tmp'));
});