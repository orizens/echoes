module.exports = function (grunt) {
	// grunt-open will open your browser at the project's URL
	return {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.server.options.port %>'
      }
    }
}