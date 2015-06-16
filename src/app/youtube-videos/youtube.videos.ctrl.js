(function(){
	
	angular
		.module('youtube.videos')
		.controller('YoutubeVideosCtrl', YoutubeVideosCtrl);

	function YoutubeVideosCtrl(YoutubePlayerSettings, YoutubeSearch, YoutubeVideoInfo){
		var vm = this;

		vm.playVideo = playVideo;
		vm.playPlaylist = playPlaylist;
		vm.queueVideo = YoutubePlayerSettings.queueVideo;
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

		function playPlaylist (playlist) {
			YoutubeVideoInfo.getPlaylist(playlist.id).then(YoutubePlayerSettings.playPlaylist);
		}
	}

})();