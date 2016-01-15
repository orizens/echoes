import gulp from 'gulp';
import karma from 'karma';

const isTravis = process.env.TRAVIS || false;
const pathToKarmaConf = process.cwd();

gulp.task('test', (done) => {
	let server = new karma.Server({
	    configFile: pathToKarmaConf + '/karma.conf.js',
	    singleRun: isTravis
	}, done)
	.start();
});