(function() {
    'use strict';

    angular
        .module('youtube.playlists')
        .controller('MyPlaylistCtrl', MyPlaylistCtrl);

    /* @ngInject */
    function MyPlaylistCtrl(videos, YoutubePlayerSettings) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'MyPlaylistCtrl';
        vm.videos = videos;
        vm.playVideo = playVideo;
        activate();

        function activate() {
        }

        function playVideo (video) {
        	console.log('playing user video');
            YoutubePlayerSettings.playVideoId(video.id);
        }
    }
})();