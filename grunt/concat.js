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
      }
    }
}