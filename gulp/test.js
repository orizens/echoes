var gulp = require('gulp');
var karma = require('karma').server;
var isTravis = process.env.TRAVIS || false;
/**
 * Run test once and exit
 */
// module.exports = gulp.task('test', function (done) {
// 	console.log('isTravis', isTravis);
//   karma.start({
//     configFile: global.project_dir + '/karma.conf.js',
//     singleRun: isTravis
//   }, done);
// });
