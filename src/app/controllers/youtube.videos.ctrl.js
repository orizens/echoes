(function(){
	
	angular
		.module('mediaDeck')
		.controller('YoutubeVideosCtrl', YoutubeVideosCtrl);

	function YoutubeVideosCtrl($scope, YoutubePlayerSettings, YoutubeSearch){
		var vm = this;

		vm.playVideo = playVideo;
		vm.feedType = YoutubeSearch.getFeedType;
		vm.videos = YoutubeSearch.items;

		activate();
		///////////
		function activate () {
			YoutubeSearch.search();
		};

		function playVideo (video) {
			YoutubePlayerSettings.playVideoId(video);
		};
	}

})();