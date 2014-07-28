module.exports = function(grunt){
	return {
      latest: {
        src: ['.tmp/updates/latest.json'],
        dest: '.tmp/updates/latest.json',
        options: {
          process: true
        }
      },

      service: {
        src: ['.tmp/js/models/updates-service.js'],
        dest: '.tmp/js/models/updates-service.js',
        options: {
          process: true
        }
      },

      html: {
        src: ['src/index.html'],
        dest: 'src/index.tmp.html',
        options: {
          procees: true
        }
      },

      dev: {
        options: {
          separator: ' \n\r '
        },
        src: [
          'src/css/bootstrap.min.css',
          'src/css/bootstrap-responsive.min.css',
          'src/css/font-awesome.css',
          'src/css/style.tmp.css'
        ],
        dest: 'src/css/style.css'
      },

      dist: {
        options: {
          separator: ' \n\r '
        },
        src: [
          '.tmp/css/bootstrap.min.css',
          '.tmp/css/bootstrap-responsive.min.css',
          '.tmp/css/font-awesome.min.css',
          '.tmp/css/style.tmp.css'
        ],
        dest: '.tmp/css/style.css'
      }
    }
}