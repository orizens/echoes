(function() {
	angular
		.module('mediaDeck')
		.controller('FeedCtrl', FeedCtrl);

	/* @ngInject */
	function FeedCtrl($scope, $rootScope, YoutubeSearch) {
	    var vm = this;
		vm.data = {
			items: [
			{ label: 'Videos', icon: 'film', value: 'video' },
			{ label: 'Playlists', icon: 'th-list', value: 'playlist' }
			]
		};

		vm.active = vm.data.items[0];

		vm.setFeed = setFeed;

	    function setFeed(item){
			vm.active = item;
	        YoutubeSearch.setType(item.value);
		}
	}
})();