(function(){
	
	angular
		.module('mediaDeck')
		.controller('YoutubeVideosCtrl', YoutubeVideosCtrl);

	function YoutubeVideosCtrl($scope, YoutubePlayerSettings, YoutubeSearch, YoutubeVideoInfo){
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
			if (video.kind === 'youtube#playlist') {
				YoutubeVideoInfo.getPlaylist(video.id).then(playPlaylistItems);
				return;
			}
			YoutubePlayerSettings.queueVideo(video);
			YoutubePlayerSettings.playVideoId(video);
		}

		function queueVideo (video) {
			YoutubePlayerSettings.queueVideo(video);
		}

		function playPlaylistItems (videos) {
			angular.extend(YoutubePlayerSettings.nowPlaylist, videos);
			YoutubePlayerSettings.playVideoId(videos[0]);
		}
	}

})();