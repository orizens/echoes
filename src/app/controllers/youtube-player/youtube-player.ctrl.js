(function() {

    angular
        .module('mediaDeck')
        .controller('YoutubePlayerCtrl', YoutubePlayerCtrl);

    /* @ngInject */
    function YoutubePlayerCtrl(YoutubePlayerSettings, PlayerResizer, PlaylistEditorSettings) {
        /*jshint validthis: true */
        var vm = this;
        vm.video = YoutubePlayerSettings.nowPlaying;
        vm.nowPlaylist = YoutubePlayerSettings.nowPlaylist;
        vm.size = PlayerResizer;
        vm.showPlayer = false;
        vm.togglePlayer = togglePlayer;
        vm.isFullScreen = false;
        vm.toggleFullScreen = toggleFullScreen;
        vm.seek = YoutubePlayerSettings.getSeek;
        vm.addToPlaylist = addToPlaylist;
        vm.playNextTrack = YoutubePlayerSettings.playNextTrack;
        vm.playPreviousTrack = YoutubePlayerSettings.playPreviousTrack;
        vm.isPlaying = isPlayerPlaying;
        vm.play = play;
        vm.pause = pause;
        vm.playlistIsEmpty = playlistIsEmpty;
        vm.playlistHasTracks = playlistHasTracks;
        vm.playlistHasOneTrack = playlistHasOneTrack;

        function togglePlayer (visible) {
            vm.showPlayer = visible;
        }

        function toggleFullScreen () {
            vm.isFullScreen = !vm.isFullScreen;
            PlayerResizer.setFullScreen(vm.isFullScreen);
        }

        function addToPlaylist () {
            if (vm.video.mediaId !== '') {
                PlaylistEditorSettings.addMedia(vm.video.media);
                PlaylistEditorSettings.show();
            }
        }

        function play () {
            YoutubePlayerSettings.getYTPlayer().playVideo();
        }

        function pause () {
            YoutubePlayerSettings.getYTPlayer().pauseVideo();
        }

        function isPlayerPlaying () {
            // because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
            return YoutubePlayerSettings.getPlayerState() === 1;
        }

        function playlistIsEmpty () {
            return YoutubePlayerSettings.nowPlaylist.length === 0;
        }

        function playlistHasTracks () {
            return YoutubePlayerSettings.nowPlaying.index > 0 && !playlistIsEmpty();
        }

        function playlistHasOneTrack () {
            return YoutubePlayerSettings.nowPlaylist.length === 1;
        }
    }

})();