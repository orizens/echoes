/* @ngInject */
export default class YoutubePlayerCreator {

  constructor($rootScope) {
    this.$rootScope = $rootScope;
  }

  createPlayer (elementId, height, width, videoId, callback) {
    return new window.YT.Player(elementId, {
      height: height,
      width: width,
      videoId: videoId,
      // playerVars: playerVars,
      events: {
        onReady: angular.noop,
        onStateChange: (ev) => {
          callback && callback(ev);
          this.$rootScope.$apply();
        }
      }
    });
  }
}