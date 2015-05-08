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
            index: 0,
            media: {}
        };
        var seek = 0;
        var nowPlaylist = [];
        var ytplayer = {};
        var service = {
            getCurrentId: getCurrentId,
            playVideoId: playVideoId,
            getCurrentType: getCurrentType,
            playPlaylistId: playPlaylistId,
            types: types,
            nowPlaying: nowPlaying,
            nowPlaylist: nowPlaylist,
            queueVideo: queueVideo,
            getSeek: getSeek,
            seekTo: seekTo,
            playNextTrack: playNextTrack,
            remove: remove,
            ytplayer: ytplayer
        };
        return service;

        ////////////////

        function getCurrentId() {
        	return nowPlaying.mediaId;
        }

        function playVideoId (video) {
        	nowPlaying.mediaId = video.id;
            nowPlaying.type = types.VIDEO;
            seek = 0;
            updatePlaylistIndex(video);
            nowPlaying.media = video;
            // nowPlaylist.length = 0;
            
        }

        function queueVideo (video) {
            nowPlaylist.push(video || {});
        }

        function updatePlaylistIndex (video) {
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

        function getSeek () {
            return seek;
        }

        function seekTo (seconds) {
            if (!isNaN(seconds) && angular.isNumber(seconds)){
                seek = seconds;
            }
        }

        function playNextTrack () {
            var nextIndex = nowPlaying.index + 1;
            if (nextIndex === nowPlaylist.length) {
                nextIndex = 0;
            }
            playVideoId(nowPlaylist[nextIndex]);
        }

        function remove (video, index) {
            nowPlaylist.splice(index, 1);
        }
    }

})();