var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('dist:bundle', ['build'], function () {
  return gulp.src([
      'src/app/bundle.js'
    ])
    .pipe(ngAnnotate())
    // .pipe(uglify({ mangle: false }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/app'));
});

gulp.task('dist:style', function () {
	return gulp.src([
			'src/css/*.css'
		])
		.pipe(gulp.dest('dist/css'));
});

gulp.task('dist:app', [ 'assets' ], function () {
	return gulp.src([
		  	'src/index.html',
		  	'src/templates.mdl.js',
		  	'src/vendors.js',
		  	'.tmp/*/**'
	    ])
	    .pipe(gulp.dest('dist'));
});

gulp.task('dist', function () {
	del('dist', function () {
		return runSequence([
			'dist:bundle', 
			'dist:style', 
			'dist:app'
		]);
	});
});