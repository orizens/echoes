(function() {
    'use strict';

	angular
		.module('youtube.directives')
		.directive('mediaList', mediaList);
		
		/* @ngInject */
		function mediaList() {
			// Usage:
	        //
	        // Creates:
	        //
			var directive = {
				restrict: 'E',
				replace: true,
				templateUrl: 'app/directives/youtube/youtube-list/media-list.tpl.html',
				scope: {
					videos: '=model',
					onSelect: '&',
					onQueue: '&'
				},
				link: link
			};

			return directive;

			function link (scope, element, attrs){
				scope.playSelectedVideo = function(video){
					scope.onSelect({
						video: video
					});
				};

				scope.queueSelectedVideo = function (video) {
					scope.onQueue({
						video: video
					});
				};
			}
		}

})();