var gulp = require('gulp');
var dogen = require('gulp-dogen');
 
dogen.config({
    templatesPath: 'gulp/templates',
    gulp: gulp
});
 
// This will create this gulp task as: 
// gulp dogen --endpoint the-name-to-be-scaffolded 
dogen.task('ngmodule', 'src/app/');
dogen.task('ngservice', 'src/app/services');