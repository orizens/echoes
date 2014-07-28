module.exports = function () {
  return {
      prepare: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src/',
          dest: '.tmp/',
          src: [
          '!test/**/*',
          '**/*'
          ]
        }]
      },

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
    }
}