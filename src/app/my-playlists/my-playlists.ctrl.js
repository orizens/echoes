(function() {
    'use strict';

    angular
        .module('youtube.playlists')
        .controller('MyPlaylistsController', MyPlaylistsController)

    /* @ngInject */
    function MyPlaylistsController($http, YoutubePlayerSettings, UserPlaylists) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'UserPlaylistsCtrl';
        vm.playlists = UserPlaylists.tracks;
        vm.playPlaylist = playPlaylist;
        vm.search = '';

        // activate();

        // function activate() {
        // }

        function playPlaylist (playlist) {
        	YoutubePlayerSettings.playPlaylistId(playlist.id, 0);
        }
    }
})();