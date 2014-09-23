module.exports = function (grunt) {
	// grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
	return {
      server: {
        options: {
          port: 9001,
          hostname: 'localhost',
          livereload: true,
          open: true,
          base: [
            'src'
          ]
        }
      }
    }
}