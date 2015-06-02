var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');
var rev = require('gulp-rev-append');
var minifyCss = require('gulp-minify-css');

gulp.task('dist:rev', function() {
  gulp.src('dist/index.html')
    .pipe(rev())
    .pipe(gulp.dest('dist'));
});

// build creates bundle.js
gulp.task('dist:bundle', ['build'], function () {
  return gulp.src([
      '.tmp/*.js'
    ])
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('dist:style', function () {
	return gulp.src([
			'.tmp/*.css'
		])
		.pipe(minifyCss())
		.pipe(gulp.dest('dist'));
});

gulp.task('dist:app', [ 'assets' ], function () {
	return gulp.src([
		  	'src/index.html',
		  	'.tmp/*/**',
		  	'.tmp/*.map'
	    ])
	    .pipe(gulp.dest('dist'));
});

gulp.task('dist:img', function () {
	return gulp.src([
			'src/img/*.*'
		])
		.pipe(gulp.dest('dist/img'));
});

gulp.task('dist:specs', function () {
	return gulp.src([
			'src/app/**/*spec.js'
		])
	.pipe(gulp.dest('dist/tests/specs'));
});

gulp.task('dist', function () {
	del('dist', function () {
		return runSequence([
			'dist:bundle', 
			'dist:style', 
			'dist:img',
			'dist:app',
			'dist:specs'
		]);
	});
});