module.exports = function(grunt) {
	return {
      dev: {
        options: {
          paths: 'src/css/',
          compress: false,
          dumpLineNumbers: 'all',
          sourceMap: true,
          sourceMapFilename: 'app.css.map',
          sourceMapURL: '../app.css.map',
          sourceMapBasepath: '/',
          outputSourceFiles: true
        },

        files: {
          'src/css/style.css': 'src/css/style.less'
        }
      },

      prod: {
        options: {
          paths: 'src/css/',
          compress: "true"
        },

        files: {
          'src/css/style.css': 'src/css/style.less'
        }
      },

      dist: {
        options: {
          paths: 'css/',
          compress: "true"
        },

        files: {
          '.tmp/css/style.css': '.tmp/css/style.less'
        }
      }
    }
}