module.exports = function(grunt) {
	return {
      options: {
        livereload: true
      },

      html: {
        files: [
          'src/index.html', 
          'src/templates/**/*.html'
        ]
      },

      scripts: {
        files: [
          'src/js/**/*.js'
        ]
      },

      css: {
        files: [
          'src/css/**/*.less',
          'src/js/modules/**/*.less'
        ],
        tasks: ['less:dev']
      },

      livereload: {
        files: ['src/css/**/*.less'],
        options: {
          livereload: '<%= connect.server.options.livereload %>'
        }
      }
    }
}