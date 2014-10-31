(function() {

    angular
        .module('mediaDeck')
        .controller('YoutubePlayerCtrl', YoutubePlayerCtrl)
        .factory('PlayerSizer', PlayerSizer);

    /* @ngInject */
    function YoutubePlayerCtrl($scope, YoutubePlayerSettings, PlayerSizer) {
        var vm = this;
        vm.video = YoutubePlayerSettings.nowPlaying;
        vm.size = PlayerSizer;
        vm.showPlayer = false;
        vm.togglePlayer = togglePlayer;
        vm.isFullScreen = false;
        vm.toggleFullScreen = toggleFullScreen;

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
            PlayerSizer.setFullScreen(vm.isFullScreen);
        }
    }

    /* @ngInject */
    function PlayerSizer ($window) {
        var defaultSizes = {
            height: 270,
            width: 300
        };
        var service = {
                height: defaultSizes.height,
                width: defaultSizes.width,
                setFullScreen: setFullScreen
            };
        return service;
    
        ////////////////
        function setFullScreen (isFullScreen) {
            if (!isFullScreen) {
                service.height = defaultSizes.height;
                service.width = defaultSizes.width;
                return;
            }
            var excludes = ['sidebar'];
            var sidebar = excludes.indexOf('sidebar') === -1 ? $('.sidebar').outerWidth() : 0;
            var height = $window.innerHeight - $('#youtube-player-container').outerHeight();
            var width = $window.innerWidth - sidebar;
            service.height = height;
            service.width = width;
        }
    }

})();