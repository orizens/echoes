    angular
        .module('mediaDeck')
        .factory('YoutubePlayerSettings', YoutubePlayerSettings);

    /* @ngInject */
    function YoutubePlayerSettings() {
    	var nowPlayingVideoId = '';
        var service = {
            getCurrentId: getCurrentId,
            playVideoId: playVideoId
        };
        return service;

        ////////////////

        function getCurrentId() {
        	return nowPlayingVideoId;
        }

        function playVideoId (videoId) {
        	nowPlayingVideoId = videoId;
        }
    }