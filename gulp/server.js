var gulp = require('gulp');
// var nodemon = require('gulp-nodemon');
// var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

module.exports = gulp.task('connect', function() {
	connect.server({
		root: 'src',
		port: 9001,
		livereload: true
	});
});

// gulp.task('default', ['connect']);

// module.exports = gulp.task( 'server:start', ['build'], function() {
// 	livereload.listen();
//     nodemon({ 
//     	script: 'server.js'
//     }).on('change', function (){
//     	livereload.changed();
//     });
// });