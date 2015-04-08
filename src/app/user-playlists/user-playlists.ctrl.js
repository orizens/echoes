(function() {
    'use strict';

    angular
        .module('mediaDeck')
        .controller('UserPlaylistsCtrl', UserPlaylistsCtrl);

    /* @ngInject */
    function UserPlaylistsCtrl($http, YoutubePlayerSettings) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'UserPlaylistsCtrl';
        vm.playlists = YoutubePlayerSettings.nowPlaylist;
        vm.playVideo = playVideo;
        vm.nowPlaying = YoutubePlayerSettings.nowPlaying;
        vm.playlistSearch = '';
        vm.remove = remove;

        // activate();

        // function activate() {
        // }

        function playVideo (video, index) {
        	// YoutubePlayerSettings.playPlaylistId(playlist.id, 0);
            vm.nowPlaying.index = index;
            YoutubePlayerSettings.playVideoId(video);
        }

        function remove ($event, video, index) {
            $event.stopPropagation();
            YoutubePlayerSettings.remove(video, index);
        }
    }
})();