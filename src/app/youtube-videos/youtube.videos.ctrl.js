(function(){
	
	angular
		.module('youtube-videos')
		.controller('YoutubeVideosCtrl', YoutubeVideosCtrl);

	function YoutubeVideosCtrl(YoutubePlayerSettings, YoutubeSearch, YoutubeVideoInfo, $timeout){
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
			YoutubeSearch.resetPageToken();
			if (!vm.videos.length) {
				YoutubeSearch.search();
			}
		}

		function playVideo (video) {
			YoutubePlayerSettings.queueVideo(video);
			YoutubePlayerSettings.playVideoId(video);
		}

		function playPlaylist (playlist) {
			return YoutubeVideoInfo.getPlaylist(playlist.id).then(YoutubePlayerSettings.playPlaylist);
		}
	}

})();