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
          dumpLineNumbers: 'all',
          sourceMap: true,
          sourceMapFilename: 'app.css.map',
          sourceMapURL: '../app.css.map',
          sourceMapBasepath: '/',
          outputSourceFiles: true
          // compress: true
        },

        files: {
          // 'src/css/vendors.css': [
          //   'src/bower_components/bootstrap/less/bootstrap.less',
          //   'src/css/echoes-variables.less'
          // ],
          'src/css/style.tmp.css': [
            'src/css/core/*.less',
            'src/css/modules/*.less',
            'src/js/views/**/*.less',
            'src/js/modules/**/*.less',
            'src/css/style.less'
          ]
        }
      },

      dist: {
        options: {
          // paths: 'src/css/'
          compress: true
        },

        files: {
          '.tmp/css/style.tmp.css': [
            '.tmp/css/core/*.less',
            '.tmp/css/modules/*.less',
            '.tmp/js/views/**/*.less',
            '.tmp/js/modules/**/*.less',
            '.tmp/css/style.less'
          ]
        }
      }
    }
}