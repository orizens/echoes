(function() {
    'use strict';

    angular
        .module('mediaDeck')
        .controller('UserPlaylistsCtrl', UserPlaylistsCtrl);

    /* @ngInject */
    function UserPlaylistsCtrl($http, YoutubePlayerSettings, UserPlaylists) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'UserPlaylistsCtrl';
        vm.playlists = YoutubePlayerSettings.nowPlaylist;
        vm.playVideo = playVideo;
        vm.nowPlaying = YoutubePlayerSettings.nowPlaying;
        vm.playlistSearch = '';

        // activate();

        // function activate() {
        // }

        function playVideo (video, index) {
        	// YoutubePlayerSettings.playPlaylistId(playlist.id, 0);
            vm.nowPlaying.index = index;
            YoutubePlayerSettings.playVideoId(video);
        }
    }
})();