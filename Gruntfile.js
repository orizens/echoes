module.exports = function(grunt) {
  // configuraiton for requirejs build
  var buildOptionsFile = grunt.file.read( 'build/app.build.js' );
  var buildOptions = eval( buildOptionsFile );

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: ['index.html', '**/*.css'],
      options: {
        livereload: true
      },

      scripts: {
        files: 'js/**/*.js'
      },

      css: {
        files: '**/*.less',
        tasks: ['less']
      }
    },
    

    less: {
      development: {
        options: {
          paths: 'css/',
          compress: "true"
        },

        files: {
          'css/modules.css': 'css/modules.less'
        }
      }
    },

    requirejs: {
      compile: {
        options: buildOptions
      }
    },
    
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`

    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '*',
          livereload: true
        }
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port %>'
      }
    }

});
  
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // grunt.registerTask('test', ['jshint', 'qunit']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('build', ['less', 'requirejs']);
  grunt.registerTask('serve', ['connect', 'open', 'watch']);

};