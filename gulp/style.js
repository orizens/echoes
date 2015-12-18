import gulp from 'gulp';
import less from 'gulp-less';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
// import uncss from 'gulp-uncss';
// var csso = require('gulp-csso');
// var glob = require('glob');

gulp.task('style', () => {
  return gulp.src([
      './src/css/style.less',
      './src/core/components/**/*.less',
      './src/components/**/*.less'
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