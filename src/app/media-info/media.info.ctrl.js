(function() {
    'use strict';
    //  NOT USED AT THE MOMENT 
    //  perhaps convert this to a directive
    angular
        .module('media.info')
        .controller('MediaInfoCtrl', MediaInfoCtrl);

    /* @ngInject */
    function MediaInfoCtrl(MediaInfoService, YoutubePlayerSettings) {
        var vm = this;
    	vm.videoInfo = MediaInfoService.info;
        vm.seekToSeconds = YoutubePlayerSettings.seekToSeconds;
    }
})();