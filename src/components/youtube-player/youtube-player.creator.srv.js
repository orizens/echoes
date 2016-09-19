/* @ngInject */
export default class YoutubePlayerCreator {

    constructor() {

    }

    createPlayer (elementId, height, width, videoId, callback) {
        return new YT.Player(elementId, {
            height: height,
            width: width,
            videoId: videoId,
            // playerVars: playerVars,
            events: {
                onReady: angular.noop,
                onStateChange: callback
            }
        });
    }
}