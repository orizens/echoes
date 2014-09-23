module.exports = function(grunt) {
	return {
      options: {
        livereload: true
      },

      html: {
        files: [
          'src/index.html', 
          'src/templates/**/*.html',
          'src/js/views/**/*.html',
          'src/js/modules/**/*.html'
        ],
        tasks: [ 'bundle']
      },

      // scripts: {
      //   files: [
      //     'src/js/**/*.js'
      //   ],
      //   tasks: ['bundle']
      // },

      css: {
        files: [
          'src/css/**/*.less',
          'src/js/modules/**/*.less',
          'src/js/views/**/*.less'
        ],
        tasks: ['style']
      },

      livereload: {
        files: ['src/css/**/*.less', 'src/bundle.js'],
        options: {
          livereload: '<%= connect.server.options.livereload %>'
        }
      }
    }
}