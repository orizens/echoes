(function() {
    'use strict';

    angular
        .module('mediaDeck')
        .controller('UserPlaylistsCtrl', UserPlaylistsCtrl)

    /* @ngInject */
    function UserPlaylistsCtrl($http, YoutubePlayerSettings, UserPlaylists) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'UserPlaylistsCtrl';
        vm.playlists = YoutubePlayerSettings.nowPlaylist;
        vm.playPlaylist = playPlaylist;

        // activate();

        // function activate() {
        // }

        function playPlaylist (playlist) {
        	YoutubePlayerSettings.playPlaylistId(playlist.id, 0);
        }
    }
})();