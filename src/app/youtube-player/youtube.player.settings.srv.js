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
            nowPlaylist: nowPlaylist,
            queueVideo: queueVideo
        };
        return service;

        ////////////////

        function getCurrentId() {
        	return nowPlaying.mediaId;
        }

        function playVideoId (video) {
        	nowPlaying.mediaId = video.id;
            nowPlaying.type = types.VIDEO;
            updatePlaylist(video);
            // nowPlaylist.length = 0;
            
        }

        function queueVideo (video) {
            nowPlaylist.push(video || {});
        }

        function updatePlaylist (video) {
            nowPlaylist.some(function(track, index){
                if (track.id === video.id) {
                    nowPlaying.index = index;
                    return true;
                }
            });
        }

        function playPlaylistId(playlistId, index) {
            // TODO - needs parse playlist id to an array
            // and set nowPlaying as the first item in the playlist or index
            nowPlaying.mediaId = playlistId;
            nowPlaying.type = types.PLAYLIST;
            playlistIndex = index;
        }

        function getCurrentType () {
            return nowPlaying.type;
        }
    }

})();