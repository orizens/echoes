import template from './youtube.playlist.tpl.html';

export default function YoutubePlaylistItem() {
	var directive = {
		restrict: 'E',
		template,
		replace: true,
		scope: {
			onPlay: '&',
			video: '=',
			back: '@'
		},
		bindToController: true,
		controller,
		controllerAs: 'vm'
	};

	return directive;

	function controller () {
		var vm = this;
		vm.isVideoItem = isVideoItem;
		vm.isChannelItem = isChannelItem;
		vm.playVideo = playVideo;
		vm.loading = false;

		function isVideoItem (video) {
	    	return vm.video.id.kind === 'youtube#video';
	    };

	    function isChannelItem(video){
	    	return vm.video.id.kind === 'youtube#channel';
	    };

	    function playVideo(video){
	    	vm.loading = true;
	    	this.onPlay({
	    		video: vm.video
	    	}).then(function (res) {
	    		vm.loading = false;
	    	});
		};
	}

}