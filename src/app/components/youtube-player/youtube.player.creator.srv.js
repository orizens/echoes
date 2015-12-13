(function() {
    'use strict';

    angular
        .module('youtube.player')
        .factory('YoutubePlayerCreator', YoutubePlayerCreator);

    /* @ngInject */
    function YoutubePlayerCreator() {
        var service = {
            createPlayer: createPlayer
        };
        return service;

        ////////////////

        function createPlayer (elementId, height, width, videoId, callback) {
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
})();