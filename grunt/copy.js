module.exports = function () {
  return {
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