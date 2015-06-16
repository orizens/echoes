(function() {
    'use strict';

    angular
        .module('youtube.videos')
	    .directive('youtubeVideos', youtubeVideos);

        /* @ngInject */
        function youtubeVideos () {
            // Usage:
            //	<youtube-videos></youtube-videos>
            // Creates:
            //
            var directive = {
            	templateUrl: 'app/youtube-videos/youtube.videos.tpl.html',
                controller: 'YoutubeVideosCtrl',
                controllerAs: 'vm',
                restrict: 'E',
                replace: true
            };
            return directive;
        }
})();