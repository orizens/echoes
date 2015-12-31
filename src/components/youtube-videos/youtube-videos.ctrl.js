/* @ngInject */
export default class YoutubeVideosCtrl {
	
	/* @ngInject */
	constructor (YoutubePlayerSettings, YoutubeSearch, YoutubeVideoInfo) {
		Object.assign(this, { YoutubePlayerSettings, YoutubeVideoInfo });

		this.queueVideo = YoutubePlayerSettings.queueVideo;
		this.getFeedType = YoutubeSearch.getFeedType;
		this.videos = YoutubeSearch.items;
		this.searchMore = YoutubeSearch.searchMore;
		
		YoutubeSearch.resetPageToken();
		if (!this.videos.length) {
			YoutubeSearch.search();
		}
	}

	playVideo (video) {
		this.YoutubePlayerSettings.queueVideo(video);
		this.YoutubePlayerSettings.playVideoId(video);
	}

	playPlaylist (playlist) {
		return this.YoutubeVideoInfo.getPlaylist(playlist.id).then(this.YoutubePlayerSettings.playPlaylist);
	}

	addVideo (video) {
		console.log('added video to playlist', video);
		// PlaylistEditorSettings.addMedia($scope.video);
		// PlaylistEditorSettings.show();
		// UserPlaylists.addToPlaylist('PLaBZBIpdZNOe1w40XjfS9Y1QJbyJMkWnR', $scope.video);
	}
}