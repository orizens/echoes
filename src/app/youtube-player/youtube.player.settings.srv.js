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
        var nowPlaylist = [];
        var ytplayer = {};
        var service = {
            getCurrentId: getCurrentId,
            playVideoId: playVideoId,
            playPlaylist: playPlaylist,
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
            seek = 0;
            updatePlaylistIndex(video);
            nowPlaying.media = video;
            
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

        function playPlaylist(videos, index) {
            var indexToPlay = angular.isNumber(index) ? index : 0;
            var firstVideo = videos[indexToPlay];
            playVideoId(firstVideo);
            nowPlaylist.length = 0;
            angular.extend(nowPlaylist, videos);
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