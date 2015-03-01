angular.module('youtube.directives')
.directive('mediaList', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'app/directives/youtube/youtube-list/media-list.tpl.html',
		// template: "<youtube-media \
		// 	ng-repeat=\"video in videos | orderBy:'snippet.publishedAt':'reverse' | limitTo:25\"> \
		// </youtube-media>",
		scope: {
			videos: '=model',
			onSelect: '&',
			onQueue: '&'
		},
		link: function(scope, element, attrs){
			scope.playSelectedVideo = function(video){
				scope.onSelect({
					video: video
				});
			};

			scope.queueSelectedVideo = function (video) {
				scope.onQueue({
					video: video
				});
			}
		}
	};
});