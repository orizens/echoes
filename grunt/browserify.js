var createOptions = function(destFile, initialPath){
	return {
		options: {
			shim: {
				jquery: {
					path: './' + initialPath + '/bower_components/jquery/dist/jquery.js',
					exports: 'jQuery'
				},

				bootstrap: {
					// path: './' + initialPath + '/js/libs/bootstrap/bootstrap.min.js',
					path: './' + initialPath + '/bower_components/bootstrap/dist/js/bootstrap.min.js',
					exports: 'bootstrap',
					depends: { jquery: '$' } 
				},

				jqueryui: {
					path: './' + initialPath + '/js/libs/jquery/jquery-ui.js',
					exports: null,
					depends: { jquery: '$' } 
				}
				},
				alias: [
					// './' + initialPath + '/js/libs/bootstrap/bootstrap.min.js:bootstrap-js',
					'./' + initialPath + '/bower_components/bootstrap/dist/js/bootstrap.min.js:bootstrap-js',
					'./' + initialPath + '/bower_components/jquery/dist/jquery.js:jquery',
					'./' + initialPath + '/js/libs/jquery/jquery-ui.js:jqueryui',
					'./' + initialPath + '/js/libs/backbone/backbone.cjs.js:backbonejs',
					'./' + initialPath + '/js/fb.js:facebook',
					'./' + initialPath + '/js/libs/environmentVars:vars'
				],
				bundleOptions: {
        		debug: true
		    },
		    transform: [
		    	'jstify'
		    ],
		    watch: true
		},
		src: ['./' + initialPath + '/js/main.js'],
		dest: destFile
	};
}
module.exports = function (grunt) {
	var config = { dev: {}, dist: {}};
	config.dev = createOptions('src/bundle.js', 'src')

	config.dist = createOptions('.tmp/bundle-build.js', '.tmp');

	return config;
}