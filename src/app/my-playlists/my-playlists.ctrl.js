(function() {
    'use strict';

    angular
        .module('youtube.playlists')
        .controller('MyPlaylistsController', MyPlaylistsController);

    /* @ngInject */
    function MyPlaylistsController($http, YoutubePlayerSettings, UserPlaylists, YoutubeVideoInfo, YoutubeUser) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'UserPlaylistsCtrl';
        vm.playlists = UserPlaylists.tracks;
        vm.playPlaylist = playPlaylist;
        vm.search = '';
        vm.isUserSignedIn = YoutubeUser.isSignedIn;

        // activate();

        // function activate() {
        // }

        function playPlaylist (playlist) {
            YoutubeVideoInfo.getPlaylist(playlist.id).then(YoutubePlayerSettings.playPlaylist);
        }
    }
})();