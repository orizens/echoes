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
      dev: {
        options: {
          paths: 'css/',
          compress: "true"
        },

        files: {
          'css/modules.css': 'css/modules.less'
        }
      },

      dist: {
        options: {
          paths: 'css/',
          compress: "true"
        },

        files: {
          '.tmp/css/modules.css': '.tmp/css/modules.less'
        }
      }
    },

    requirejs: {
      compile: {
        options: buildOptions
      }
    },
    
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.tmp/',
          dest: './',
          src: [
          '**/*'
          // '*.{ico,png,txt,html,map}',
          // 'bower_components/bootstrap/dist/**/*',
          // 'mocks/**/*',
          // 'common/**/*',
          // 'scripts/**/*',
          // 'vendors/**/*',
          // 'styles/**/*.css',
          // 'images/{,*/}*.{webp}',
          // '**/*.less'
          ]
        }]
      }
    },

    gitcheckout: {
      dist: {
        options: {
          branch: 'gh-pages'
        }
      }
    },

    gitcommit: {
      dist: {
        options: {
          message: "production",
          ignoreEmpty: true
        },
        files: {
          files: ['.']
        }
      }
    },

    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`

    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '*',
          livereload: true,
          open: true
        }
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.server.options.port %>'
      }
    }

});
  
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-git');

  // grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('gitc', ['copy:dist']);
  grunt.registerTask('rq', ['requirejs']);
  grunt.registerTask('cssd', ['less:dist']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('build', [
    // build project
    'requirejs',
    // checkout the branch of production
    'less:dist', 
    'gitcheckout:dist',
    // copy the build project 
    'copy:dist'
    // add, commit and push
    // 'gitcommit:dist'
  ]);
  grunt.registerTask('serve', ['less:dev', 'connect', 'watch']);
};