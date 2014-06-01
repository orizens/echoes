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
          'css/**/*.less',
          'js/modules/**/*.less'
        ],
        tasks: ['less:dev']
      },

      livereload: {
        files: ['css/**/*.less'],
        options: {
          livereload: '<%= connect.server.options.livereload %>'
        }
      }
    },
    

    less: {
      dev: {
        options: {
          paths: 'css/',
          compress: false,
          dumpLineNumbers: 'all',
          sourceMap: true,
          sourceMapFilename: 'app.css.map',
          sourceMapURL: '../app.css.map',
          sourceMapBasepath: '/',
          outputSourceFiles: true
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
      },

      dist: {
        options: {
          paths: 'css/',
          compress: "true"
        },

        files: {
          '.tmp/css/style.css': '.tmp/css/style.less'
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
          hostname: 'localhost',
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
    },

    useminPrepare: {
      html: 'tmp.html',
      options: {
        dest: 'dist'
      }
    },

    usemin: {
      html: 'dist/{,*/}*.html'
    }

});
  
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  [
  'assemble-less',
  'grunt-contrib-requirejs',
  'grunt-contrib-connect',
  'grunt-contrib-watch',
  'grunt-contrib-copy',
  'grunt-usemin',
  'grunt-contrib-concat',
  'grunt-git'
  ].forEach(function(mod){
    grunt.loadNpmTasks(mod);
  });
 
  // grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('gitc', ['copy:dist']);
  grunt.registerTask('rq', ['requirejs']);
  grunt.registerTask('cssd', ['less:dist']);
  grunt.registerTask('cssdev', ['less:dev']);
  grunt.registerTask('min', ['useminPrepare','concat',  'usemin']);

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
