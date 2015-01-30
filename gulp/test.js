var gulp = require('gulp');
var karma = require('karma').server;
var isTravis = process.env.TRAVIS || false;
var pathToKarmaConf = __dirname.replace('/gulp', '');

module.exports = gulp.task('test', function (done) {
	console.log('isTravis', isTravis);
  karma.start({
    configFile: pathToKarmaConf + '/karma.conf.js',
    singleRun: isTravis
  }, done);
});
