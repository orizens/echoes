'use strict';

import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import gutil        from 'gulp-util';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'vinyl-buffer';
import streamify    from 'gulp-streamify';
import watchify     from 'watchify';
import browserify   from 'browserify';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
// import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import debowerify   from 'debowerify';
import ngAnnotate   from 'browserify-ngannotate';
import notify from 'gulp-notify';
import stringify from 'stringify';

const isDevMode = process.env.ENV && process.env.ENV === 'dev';

function createSourcemap() {
  return true;
  // return isDevMode || config.browserify.prodSourcemap;
}

function handleErrors (error) {

  if( isDevMode ) {

    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');

  } else {
    // Log the error and stop the process
    // to prevent broken code from building
    console.log(error);
    process.exit(1);
  }

}

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

  let bundler = browserify({
    entries: ['./src/app.js'],
    debug: true, //createSourcemap(),
    cache: {},
    packageCache: {},
    fullPaths: isDevMode // isDevMode
  });

  if ( isDevMode ) {
    bundler = watchify(bundler);

    bundler.on('update', function() {
      rebundle();
      gutil.log('Rebundle...');
    });
  }

  const transforms = [
    { 'name':babelify, 'options': {}},
    // { 'name':debowerify, 'options': {}},
    { 'name':ngAnnotate, 'options': {}}
    // { 'name':'brfs', 'options': {}},
    // { 'name':' bulkify', 'options': {}}
  ];

  transforms.forEach(function(transform) {
    bundler.transform(transform.name, transform.options);
  });
  bundler.transform(stringify(['.html']));

  function rebundle() {
    const stream = bundler.bundle();
    const sourceMapLocation = global.isProd ? './' : './';

    return stream.on('error', handleErrors)
      .pipe(source(file))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      // .pipe(global.isProd, streamify(uglify({
      //   compress: { drop_console: true }
      // })))
      .pipe(uglify())
      .pipe(sourcemaps.write(sourceMapLocation))
      .pipe(gulp.dest('.tmp'))
      .pipe(browserSync.stream());
  }

  return rebundle();

}

gulp.task('browserify', () => {

  return buildScript('bundle-bfy.js');

});