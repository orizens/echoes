(function() {

    angular
        .module('mediaDeck')
        .controller('YoutubePlayerCtrl', YoutubePlayerCtrl)

    /* @ngInject */
    function YoutubePlayerCtrl($scope, YoutubePlayerSettings, PlayerResizer) {
        var vm = this;
        vm.video = YoutubePlayerSettings.nowPlaying;
        vm.nowPlaylist = YoutubePlayerSettings.nowPlaylist;
        vm.size = PlayerResizer;
        vm.showPlayer = false;
        vm.togglePlayer = togglePlayer;
        vm.isFullScreen = false;
        vm.toggleFullScreen = toggleFullScreen;
        vm.seek = YoutubePlayerSettings.getSeek;

        $scope.$watch('vm.video', function (newShow, oldShow) {
            if(newShow !== oldShow) {
                togglePlayer(true);
            }
        }, true);

        function togglePlayer (visible) {
            vm.showPlayer = visible;
        }

        function toggleFullScreen () {
            vm.isFullScreen = !vm.isFullScreen;
            PlayerResizer.setFullScreen(vm.isFullScreen);
        }
    }

})();