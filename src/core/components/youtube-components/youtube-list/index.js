import template from './youtube-list.tpl.html';

/* @ngInject */
export default function youtubeList() {
	// Usage:
    //	<youtube-list videos on-select="func(video)" on-queue="func(video)"></youtube-list>
    // Creates:
    //
	var directive = {
		restrict: 'E',
		replace: true,
		template,
		scope: {
			videos: '=',
			onSelect: '&',
			onQueue: '&',
			onAdd: '&'
		},
		bindToController: true,
		controllerAs: 'vm',
		controller
	};

	return directive;

	function controller (){
		var vm = this;
		vm.playSelectedVideo = playSelectedVideo;
		vm.queueSelectedVideo = queueSelectedVideo;
		vm.add = add;

		function playSelectedVideo (video){
			vm.onSelect({ video });
		}

		function queueSelectedVideo (video) {
			vm.onQueue({ video });
		}

		function add (video) {
			vm.onAdd({ video });
		}
	}
}