module.exports = function (grunt) {
	return {
      build: ['.tmp/'],
      
      'after-build': [
      	'.tmp/test/',
      	'.tmp/js/',
      	'.tmp/bower_components',
      	'.tmp/templates'
      ]
    }
}