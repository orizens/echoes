/* @ngInject */
export default function PlayerResizer ($window) {
    var defaultSizes = {
        height: 270,
        width: 300
    };
    var isFull = false;
    var service = {
            height: defaultSizes.height,
            width: defaultSizes.width,
            setFullScreen: setFullScreen,
            isFullScreen: isFullScreen
        };
    return service;

    ////////////////
    function setFullScreen (isFullScreen) {
        isFull = isFullScreen;
        if (!isFullScreen) {
            service.height = defaultSizes.height;
            service.width = defaultSizes.width;
            return;
        }
        var excludes = ['sidebar'];
        var sidebar = excludes.indexOf('sidebar') === -1 ? $('.sidebar').outerWidth() : 0;
        var height = $window.innerHeight;// - $('#youtube-player-container').outerHeight();
        var width = $window.innerWidth - sidebar;
        service.height = height;
        service.width = width;
    }

    function isFullScreen () {
        return isFull;
    }
}