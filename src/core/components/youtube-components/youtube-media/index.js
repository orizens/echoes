import './youtube-media.less';
import template from './youtube-media.html';

/* @ngInject */
export default function YoutubeMedia() {
	var directive = {
		restrict: 'E',
		templateUrl: template,
		replace: true,
		scope: {
			onPlay: '&',
			onQueue: '&',
			onAdd: '&',
			video: '='
		},
		controller,
		controllerAs: 'vm',
		bindToController: true
	};

	return directive;

	/* @ngInject */
	function controller () {
		var vm = this;
	    vm.playVideo = playVideo;
		vm.queueVideo = queueVideo;
		vm.add = add;
		vm.showDesc = false;
		vm.toggle = toggle;
		vm.isPlaying = false;

	    function playVideo (video){
	    	vm.onPlay({ video });
		}

		function queueVideo(video) {
			vm.onQueue({ video });
		}

		function add (video) {
			vm.onAdd({ video });
			// PlaylistEditorSettings.addMedia($scope.video);
			// PlaylistEditorSettings.show();
			// UserPlaylists.addToPlaylist('PLaBZBIpdZNOe1w40XjfS9Y1QJbyJMkWnR', $scope.video);
		}

		function toggle (showDesc) {
			vm.showDesc = !showDesc;
		}
	}

}