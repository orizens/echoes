(function() {

    angular
        .module('youtube.player')
        .factory('YoutubePlayerSettings', YoutubePlayerSettings);

    /* @ngInject */
    function YoutubePlayerSettings() {
        var nowPlaying = {
            mediaId: '',
            index: 0,
            media: {}
        };
        var seek = 0;
        var ytplayer = {};
        var nowPlaylist = [];
        var service = {
            getCurrentId: getCurrentId,
            playVideoId: playVideoId,
            playPlaylist: playPlaylist,
            nowPlaying: nowPlaying,
            nowPlaylist: nowPlaylist,
            queueVideo: queueVideo,
            queuePlaylist: queuePlaylist,
            getSeek: getSeek,
            seekTo: seekTo,
            playNextTrack: playNextTrack,
            playPreviousTrack: playPreviousTrack,
            remove: remove,
            clear: clear,
            setYTPlayer: setYTPlayer,
            getYTPlayer: getYTPlayer,
            getPlayerState: getPlayerState,
            playerState: {}
        };
        return service;

        ////////////////

        function getCurrentId() {
        	return nowPlaying.mediaId;
        }

        function playVideoId (video) {
        	nowPlaying.mediaId = video.id;
            seek = 0;
            updatePlaylistIndex(video);
            nowPlaying.media = video;
            
        }

        function queueVideo (video) {
            nowPlaylist.push(video || {});
        }

        function queuePlaylist (videos) {
            angular.extend(nowPlaylist, videos);
        }

        function updatePlaylistIndex (video) {
            nowPlaylist.some(function(track, index){
                if (track.id === video.id) {
                    nowPlaying.index = index;
                    return true;
                }
            });
        }

        function playPlaylist(videos, index) {
            var indexToPlay = angular.isNumber(index) ? index : 0;
            var firstVideo = videos[indexToPlay];
            nowPlaylist.length = 0;
            queuePlaylist(videos);
            playVideoId(firstVideo);
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

        function playPreviousTrack () {
            var nowIndex = nowPlaying.index;
            if (nowPlaylist.length === 1 || nowPlaylist.length === 0) {
                return;
            }
            var prevIndex = nowIndex === 0 ? nowPlaylist.length - 1 : nowIndex - 1;
            playVideoId(nowPlaylist[prevIndex]);
        }
        function remove (video, index) {
            nowPlaylist.splice(index, 1);
            updatePlaylistIndex(nowPlaying.media);
        }

        function clear () {
            nowPlaylist.length = 0;
        }

        function setYTPlayer (player) {
            ytplayer = player;
        }

        function getYTPlayer () {
            return ytplayer;
        }

        function getPlayerState () {
            return service.playerState;
        }
    }

})();