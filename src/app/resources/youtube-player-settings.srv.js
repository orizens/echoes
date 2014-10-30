    angular
        .module('mediaDeck')
        .factory('YoutubePlayerSettings', YoutubePlayerSettings);

    /* @ngInject */
    function YoutubePlayerSettings() {
        var types = {
            VIDEO: 'video',
            PLAYLIST: 'playlist'
        };
        var nowPlaying = {
            mediaId: '',
            type: types.VIDEO,
            index: 0
        };
        var service = {
            getCurrentId: getCurrentId,
            playVideoId: playVideoId,
            getCurrentType: getCurrentType,
            types: types,
            nowPlaying: nowPlaying
        };
        return service;

        ////////////////

        function getCurrentId() {
        	return nowPlaying.mediaId;
        }

        function playVideoId (videoId) {
        	nowPlaying.mediaId = videoId;
            nowPlaying.type = types.VIDEO;
        }

        function playPlaylistId(playlistId, index) {
            nowPlaying.mediaId = playlistId;
            nowPlaying.type = types.PLAYLIST;
            playlistIndex = index;
        }

        function getCurrentType () {
            return nowPlaying.type;
        }
    }