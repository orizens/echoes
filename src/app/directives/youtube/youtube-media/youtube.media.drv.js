(function() {
angular.module('youtube.directives')
.directive('youtubeMedia', YoutubeMedia);

/* @ngInject */
function YoutubeMedia(UserPlaylists, PlaylistEditorSettings) {
	var directive = {
		restrict: 'E',
		templateUrl: 'app/directives/youtube/youtube-media/youtube.media.tpl.html',
		replace: true,
		scope: {
			onPlay: '&',
			onQueue: '&',
			video: '='
		},
		controller: controller,
		controllerAs: 'vm'
	};

	return directive;

	/* @ngInject */
	function controller ($scope) {
		var vm = this;
	    vm.playVideo = playVideo;
		vm.queueVideo = queueVideo;
		vm.add = add;
		vm.showDesc = false;
		vm.toggle = toggle;

	    function playVideo (video){
	    	$scope.onPlay({
	    		video: video
	    	});
		}

		function queueVideo(video) {
			$scope.onQueue({
				video: video
			});
		}

		function add () {
			PlaylistEditorSettings.addMedia($scope.video);
			PlaylistEditorSettings.show();
			// UserPlaylists.addToPlaylist('PLaBZBIpdZNOe1w40XjfS9Y1QJbyJMkWnR', $scope.video);
		}

		function toggle (showDesc) {
			vm.showDesc = !showDesc;
		}
	}

}

})();