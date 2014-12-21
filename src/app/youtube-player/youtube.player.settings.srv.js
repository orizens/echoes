(function() {

    angular
        .module('youtube.player')
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
        var nowPlaylist = [];
        var service = {
            getCurrentId: getCurrentId,
            playVideoId: playVideoId,
            getCurrentType: getCurrentType,
            playPlaylistId: playPlaylistId,
            types: types,
            nowPlaying: nowPlaying,
            nowPlaylist: nowPlaylist
        };
        return service;

        ////////////////

        function getCurrentId() {
        	return nowPlaying.mediaId;
        }

        function playVideoId (video) {
        	nowPlaying.mediaId = video.id;
            nowPlaying.type = types.VIDEO;
            nowPlaylist.length = 0;
            nowPlaylist.push(video || {});
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

})();