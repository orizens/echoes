import template from './youtube-list.tpl.html';

// Usage:
//	<youtube-list videos on-select="func(video)" on-queue="func(video)"></youtube-list>
// Creates:
//
export const YoutubeList = {
	selector: 'youtubeList',
	templateUrl: template,
	bindings: {
		videos: '<',
		onSelect: '&',
		onQueue: '&',
		onAdd: '&'
	},
	controllerAs: 'vm',
	controller: function() {
		var vm = this;
		vm.playSelectedVideo = playSelectedVideo;
		vm.queueSelectedVideo = queueSelectedVideo;
		vm.add = add;

		function playSelectedVideo(video) {
			vm.onSelect({
				video
			});
		}

		function queueSelectedVideo(video) {
			vm.onQueue({
				video
			});
		}

		function add(video) {
			vm.onAdd({
				video
			});
		}
	}
}
