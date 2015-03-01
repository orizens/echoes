(function() {
angular.module('youtube.directives')
.directive('youtubeMedia', YoutubeMedia);
	
function YoutubeMedia() {
	var directive = {
		restrict: 'E',
		templateUrl: 'app/directives/youtube/youtube-media/youtube.media.tpl.html',
		replace: true,
		scope: {
			onPlay: '&',
			onQueue: '&',
			video: '='
		},
		link: link
	};

	return directive;

	function link (scope, element, attrs) {
		scope.isVideoItem = function (video) {
	    	return video.id.kind === 'youtube#video';
	    };

	    scope.isChannelItem = function(video){
	    	return video.id.kind === 'youtube#channel';
	    };

	    scope.playVideo = function(video){
	    	scope.onPlay({
	    		video: video
	    	});
		};

		scope.queueVideo = function (video) {
			scope.onQueue({
				video: video
			});
		}
	}

}

})();