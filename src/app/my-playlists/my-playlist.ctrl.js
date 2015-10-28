(function() {
    'use strict';

    angular
        .module('youtube.playlists')
        .controller('MyPlaylistCtrl', MyPlaylistCtrl);

    /* @ngInject */
    function MyPlaylistCtrl($scope, videos, playlist, YoutubePlayerSettings) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'MyPlaylistCtrl';
        vm.videos = videos;
        vm.playlist = playlist[0];
        vm.playVideo = playVideo;
        vm.queueVideo = queueVideo;
        activate();

        function activate() {
        }

        function playVideo (video) {
        	console.log('playing user video');
            YoutubePlayerSettings.playVideoId(video);
            YoutubePlayerSettings.nowPlaylist.length = 0;
            angular.extend(YoutubePlayerSettings.nowPlaylist, vm.videos);
            vm.videos.forEach((v, index) => {
                if (v === video) {
                    YoutubePlayerSettings.nowPlaying.index = index;
                }
            });
        }

        function queueVideo (video) {
            YoutubePlayerSettings.queueVideo(video);
        }
    }
})();