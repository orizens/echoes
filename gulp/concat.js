import gulp from 'gulp';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import useref from 'gulp-useref';
import replace from 'gulp-replace';
import ngHtml2Js from 'gulp-ng-html2js';
import minifyHtml from 'gulp-minify-html';
import uglify from 'gulp-uglify';
import ngAnnotate from 'gulp-ng-annotate';

gulp.task('build', ['concat'], () => {
  gulp.src([
  	'!./src/app/bundle.js',
  	'!./src/app/**/*.spec.js',

    './src/app.js', 
    './src/app/**/*.mdl.js', 
  	'./src/app/**/*.module.js', 
  	'./src/app/**/*.js', 
  	])
  	.pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    // .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('concat:vendors', () => {
    var assets = useref.assets();
    return gulp.src('./src/index.html')
        .pipe(assets)
        // .pipe(assets.restore())
        .pipe(useref())
        .pipe(replace(/^\/\/#\ssourceMappingURL=[\w0-9$.\-_]+/gm, ' '))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('html2js', () => {
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

gulp.task('concat:all', ['concat:vendors', 'html2js'], () => {
  return gulp.src([
      './src/vendors.js', 
      './src/app/htmlTemplates.mdl.js', 
      './src/templates.mdl.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('assets.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('assets', () => {
  return gulp.src([
    'bower_components/font-awesome/fonts/*.*',
    'bower_components/bootstrap/fonts/*.*'
    ])
    .pipe(gulp.dest('.tmp/fonts/'));
});

gulp.task('concat', ['concat:vendors', 'html2js']);