module.exports = function(grunt) {

  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),
    getCss: function() {
      return 'css/vendors.css';
    },

    src: {
      js: ['<%= distdir %>/templates/**/*.js']
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

    useminPrepare: {
      html: 'tmp.html',
      options: {
        dest: 'dist'
      }
    },

    usemin: {
      html: 'dist/{,*/}*.html'
    },

    uglify: {
      dist: {
        options: {
          sourceMap: true,
          sourceMapName: '.tmp/bundle.map'
        },
        files: {
          '.tmp/bundle.js': '.tmp/bundle-build.js'
        }
      }
    }
  };

  // load all external grunt plugins
  ['clean', 'concat', 'connect', 'copy', 'less', 
  'open', 'watch', 'browserify']
  .forEach(function(fileName){
    gruntConfig[fileName] = require('./grunt/' + fileName + '.js')(grunt);
  });

  grunt.initConfig(gruntConfig);

  [
  'assemble-less',
  'grunt-contrib-requirejs',
  'grunt-contrib-connect',
  'grunt-contrib-watch',
  'grunt-contrib-copy',
  'grunt-usemin',
  'grunt-contrib-concat',
  'grunt-git',
  'grunt-contrib-clean',
  'grunt-browserify',
  'grunt-contrib-uglify'
  ]
  .forEach(function(mod){
    grunt.loadNpmTasks(mod);
  });
 
  // grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('gitc', ['copy:dist']);
  grunt.registerTask('rq', ['requirejs']);
  grunt.registerTask('cssd', ['less:dist']);
  grunt.registerTask('cssdev', ['less:dev']);
  grunt.registerTask('style', ['less:prod', 'concat:dev']);
  grunt.registerTask('style-dist', ['less:dist', 'concat:dist']);
  grunt.registerTask('min', ['useminPrepare','concat',  'usemin']);
  grunt.registerTask('create-version', ['concat:latest', 'concat:service']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('build', [
    'clean:build',
    // build project
    'copy:prepare',
    // checkout the branch of production
    'style-dist',
    'create-version',
    'browserify:dist',
    'uglify',
    'clean:after-build'
    // 'gitcheckout:dist',
    // copy the build project 
    // 'copy:dist'
    // add, commit and push
    // 'gitcommit:dist'
  ]);

  grunt.registerTask('buildgit', [
    'build',
    'gitcheckout:dist',
    // copy the build project 
    'copy:dist',
    'clean:build'
    // add, commit and push
    // 'gitcommit:dist'
  ]);
  grunt.registerTask('default', ['style', 'browserify', 'connect', 'watch']);

  grunt.registerTask('bundle', ['browserify']);
};
