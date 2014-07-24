module.exports = function(grunt) {

  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),

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
          sourceMapName: 'src/bundle.min.map'
        },
        files: {
          'src/bundle.min.js': 'src/bundle.js'
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
  grunt.registerTask('min', ['useminPrepare','concat',  'usemin']);
  grunt.registerTask('create-version', ['concat:latest', 'concat:service']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('build', [
    'clean:build',
    // build project
    'requirejs',
    // checkout the branch of production
    'less:dist', 
    'create-version'
    // 'gitcheckout:dist',
    // copy the build project 
    // 'copy:dist'
    // add, commit and push
    // 'gitcommit:dist'
  ]);

  grunt.registerTask('buildgit', [
    'clean:build',
    // build project
    'requirejs',
    // checkout the branch of production
    'less:dist',
    'create-version',
    'gitcheckout:dist',
    // copy the build project 
    'copy:dist',
    'clean:build'
    // add, commit and push
    // 'gitcommit:dist'
  ]);
  grunt.registerTask('default', ['less:dev', 'browserify', 'connect', 'watch']);

  grunt.registerTask('bundle', ['browserify']);
};
