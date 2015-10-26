import gulp from 'gulp';
import karma from 'karma';

const isTravis = process.env.TRAVIS || false;
const pathToKarmaConf = __dirname.replace('/gulp', '');

gulp.task('test', (done) => {
  karma.server.start({
    configFile: pathToKarmaConf + '/karma.conf.js',
    singleRun: isTravis
  }, done);
});