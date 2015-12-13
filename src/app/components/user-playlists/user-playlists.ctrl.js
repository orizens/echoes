(function() {
    'use strict';

    angular
        .module('echoes')
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
        vm.remove = remove;
        vm.clearPlaylist = YoutubePlayerSettings.clear;
        vm.togglePlaylistSaver = togglePlaylistSaver;
        vm.showPlaylistSaver = false;
        vm.onPlaylistSave = onPlaylistSave;
        vm.updateIndex = updateIndex;

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

        function togglePlaylistSaver () {
            vm.showPlaylistSaver = !vm.showPlaylistSaver;
        }

        function onPlaylistSave () {
            togglePlaylistSaver();
            UserPlaylists.list();
        }

        function updateIndex ($item, $indexTo) {
            if ($item.id === vm.nowPlaying.media.id) {
                vm.nowPlaying.index = $indexTo;
            }
        }
    }
})();