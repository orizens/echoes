module.exports = function(grunt) {
  // configuraiton for requirejs build
  var buildOptionsFile = grunt.file.read( 'src/build/app.build.js' );
  var buildOptions = eval( buildOptionsFile );

  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),

    src: {
      js: ['<%= distdir %>/templates/**/*.js']
    },

    requirejs: {
      compile: {
        options: buildOptions
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

    useminPrepare: {
      html: 'tmp.html',
      options: {
        dest: 'dist'
      }
    },

    usemin: {
      html: 'dist/{,*/}*.html'
    }
  };

  // load all external grunt plugins
  ['clean', 'concat', 'connect', 'copy', 'less', 
  'open', 'watch']
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
  'grunt-contrib-clean'
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
  grunt.registerTask('default', ['less:dev', 'connect', 'watch']);
};
