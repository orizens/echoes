module.exports = function(grunt) {
  // configuraiton for requirejs build
  var buildOptionsFile = grunt.file.read( 'build/app.build.js' );
  var buildOptions = eval( buildOptionsFile );

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: [
          'index.html', 
          'templates/**/*.html'
        ]
      },

      scripts: {
        files: 'js/**/*.js'
      },

      css: {
        files: [
          'css/**/*.less'
        ],
        tasks: ['less:development']
      },

      livereload: {
        files: ['css/**/*.less'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      }
    },
    

    less: {
      development: {
        options: {
          paths: 'css/',
          compress: 'false',
          dumpLineNumbers: 'all'
        },

        files: {
          'css/style.css': 'css/style.less'
        }
      },

      prod: {
        options: {
          paths: 'css/',
          compress: "true"
        },

        files: {
          'css/style.css': 'css/style.less'
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
      options: {
        port: 9001,
        hostname: "0.0.0.0",
        // Replace with the directory you want the files served from
        // bases: [__dirname],
        livereload: 35729
      },

      livereload: {
        options: {
          open: 'http://localhost:<%= connect.options.port %>'
        }
      }
    }

});
  
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // grunt.registerTask('test', ['jshint', 'qunit']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('css', ['less:development']);
  grunt.registerTask('build', ['less:prod', 'requirejs']);
  grunt.registerTask('serve', ['less:development', 'connect', 'watch']);

};