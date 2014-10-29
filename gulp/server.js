var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');


module.exports = gulp.task( 'server:start', ['build'], function() {
	livereload.listen();
    nodemon({ 
    	script: 'server.js'
    }).on('change', function (){
    	livereload.changed();
    });
});