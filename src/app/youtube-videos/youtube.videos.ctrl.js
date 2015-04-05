(function(){
	
	angular
		.module('mediaDeck')
		.controller('YoutubeVideosCtrl', YoutubeVideosCtrl);

	function YoutubeVideosCtrl($scope, YoutubePlayerSettings, YoutubeSearch){
		var vm = this;

		vm.playVideo = playVideo;
		vm.queueVideo = queueVideo;
		vm.feedType = YoutubeSearch.getFeedType;
		vm.videos = YoutubeSearch.items;
		vm.loadMore = YoutubeSearch.searchMore;

		activate();
		///////////
		function activate () {
			YoutubeSearch.search();
		}

		function playVideo (video) {
			YoutubePlayerSettings.queueVideo(video);
			YoutubePlayerSettings.playVideoId(video);
		}

		function queueVideo (video) {
			YoutubePlayerSettings.queueVideo(video);
		}
	}

})();