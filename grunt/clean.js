module.exports = function (grunt) {
	return {
      build: ['.tmp/'],
      
      'after-build': [
      	'.tmp/test/',
            '.tmp/js/',
      	'.tmp/bundle-build.js',
      	'.tmp/bower_components/bootstrap/*',
      	'.tmp/bower_components/bootstrap/.*',
      	'!.tmp/bower_components/bootstrap/fonts',
      	'.tmp/bower_components/jquery',
      	'.tmp/bower_components/font-awesome/*',
      	'.tmp/bower_components/font-awesome/.*',
      	'!.tmp/bower_components/font-awesome/fonts',
      	'.tmp/templates'
      ]
    }
}