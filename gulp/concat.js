var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var useref = require('gulp-useref');
var replace = require('gulp-replace');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

module.exports = gulp.task('build', ['concat'], function() {
  gulp.src([
  	'!./src/app/bundle.js',
  	'!./src/app/**/*.spec.js',

    // echoes source
    '!./src/BACKBONE/**/*.js',

    './src/app.js', 
  	'./src/app/**/*.mdl.js', 
  	'./src/app/**/*.js', 
  	])
  	.pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    // .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('concat:vendors', function () {
    var assets = useref.assets();
    return gulp.src('./src/index.html')
        .pipe(assets)
        // .pipe(assets.restore())
        .pipe(useref())
        .pipe(replace(/^\/\/#\ssourceMappingURL=[\w0-9$.\-_]+/gm, ' '))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('html2js', function(){
  return gulp.src([
    './src/app/**/*.html'
    ])
    .pipe(minifyHtml({
          empty: true,
          spare: true,
          quotes: true
      }))
      .pipe(ngHtml2Js({
          moduleName: 'htmlTemplates',
          prefix: 'app/',
          declareModule: false
      }))
      .pipe(concat('templates.mdl.js'))
      .pipe(uglify())
      .pipe(gulp.dest('.tmp'));
});

gulp.task('concat:all', ['concat:vendors', 'html2js'], function () {
  return gulp.src(['./src/vendors.js', './src/app/htmlTemplates.mdl.js', './src/templates.mdl.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('assets.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('assets', function () {
  return gulp.src([
    'bower_components/font-awesome/fonts/*.*',
    'bower_components/bootstrap/fonts/*.*'
    ])
    .pipe(gulp.dest('.tmp/fonts/'));
});

gulp.task('concat', ['concat:vendors', 'html2js']);