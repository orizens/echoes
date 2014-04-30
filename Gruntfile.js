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
        files: '**/*.js'
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
      },

      dist: {
        options: {
          paths: 'css/',
          compress: "true"
        },

        files: {
          '.tmp/css/modules.css': 'css/modules.less'
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
    express: {
      all: {
        options: {
          port: 9001,
          hostname: "0.0.0.0",
          // Replace with the directory you want the files served from
          bases: [__dirname],
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
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-git');

  // grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('gitc', ['copy:dist']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('build', [
    // build project
    'less:dist', 
    'requirejs',
    // checkout the branch of production
    'gitcheckout:dist',
    // copy the build project 
    'copy:dist'
    // add, commit and push
    // 'gitcommit:dist'
  ]);
  grunt.registerTask('serve', ['express', 'open', 'watch']);

};