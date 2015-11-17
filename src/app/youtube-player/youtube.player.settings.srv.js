(function() {

    angular
        .module('youtube.player')
        .factory('YoutubePlayerSettings', YoutubePlayerSettings);

    /* @ngInject */
    function YoutubePlayerSettings(localStorageService, YoutubePlayerCreator) {
        var nowPlaying = {
            mediaId: '',
            index: 0,
            media: {},
            showPlayer: false
        };
        var seek = 0;
        var ytplayer = {};
        var autoNext = true;
        var Storage = {
            NOW_PLAYLIST: 'nowPlaylist'
        };
        
        var nowPlaylist = localStorageService.get(Storage.NOW_PLAYLIST) || [];
        var service = {
            getCurrentId,
            playVideoId,
            playPlaylist,
            nowPlaying,
            nowPlaylist,
            queueVideo,
            queuePlaylist,
            getSeek,
            seekToSeconds,
            playNextTrack,
            playPreviousTrack,
            remove,
            clear,
            setYTPlayer,
            getYTPlayer,
            getPlayerState,
            playerState: {},
            createPlayer,
            showPlayer,
            setSize
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
            nowPlaying.showPlayer = true;
            ytplayer.loadVideoById(video.id);
            ytplayer.playVideo();
        }

        function queueVideo (video) {
            var videoIsNew = nowPlaylist.every(function(track){
                return track.id !== video.id;
            });
            if (!videoIsNew) {
                return;
            }
            nowPlaylist.push(video || {});
            localStorageService.set(Storage.NOW_PLAYLIST, nowPlaylist);
        }

        function queuePlaylist (videos) {
            angular.extend(nowPlaylist, videos);
            localStorageService.set(Storage.NOW_PLAYLIST, nowPlaylist);
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

        // options.stopOnLast: true (optional) - won't play the next track
        function playNextTrack (options) {
            var nextIndex = nowPlaying.index + 1;
            var nextTrackIsLast = nextIndex === nowPlaylist.length;
            nextIndex = nextTrackIsLast ? 0 : nextIndex;
            if (nextTrackIsLast && angular.isDefined(options) && options.stopOnLast) {
                return;
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
            localStorageService.set(Storage.NOW_PLAYLIST, nowPlaylist);
        }

        function clear () {
            nowPlaylist.length = 0;
            localStorageService.set(Storage.NOW_PLAYLIST, nowPlaylist);
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

        function createPlayer (elementId, height, width, videoId, callback) {
            ytplayer = YoutubePlayerCreator.createPlayer(elementId, height, width, videoId, onPlayerStateChange);
            return ytplayer;

            function onPlayerStateChange (event) {
                var state = event.data;
                
                // play the next song if its not the end of the playlist
                // should add a "repeat" feature
                if (angular.isDefined(autoNext) && state === YT.PlayerState.ENDED) {
                    service.playNextTrack({ stopOnLast: true });
                }

                if (state === YT.PlayerState.PAUSED) {
                    service.playerState = YT.PlayerState.PAUSED;
                }
                if (state === YT.PlayerState.PLAYING) {
                    service.playerState = YT.PlayerState.PLAYING;
                }
                callback(state);
            }
        }

        function setSize (height, width) {
            ytplayer.setSize(width, height);
        }

        function play () {
            if (ytplayer) {
                ytplayer.playVideo();
            }
        }

        function pause () {
            if (ytplayer) {
                ytplayer.pauseVideo();
            }
        }

        function seekToSeconds (seconds) {
            if (!isNaN(seconds) && angular.isNumber(seconds)){
                ytplayer.seekTo(seconds, true);
            }
        }

        function showPlayer () {
            return nowPlaying.showPlayer;
        }
    }

})();