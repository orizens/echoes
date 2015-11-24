export default class YoutubeVideosController {
	constructor(YoutubePlayerSettings, YoutubeSearch, YoutubeVideoInfo) {
		this.playVideoId = YoutubePlayerSettings.playVideoId;
		this.queueVideo = YoutubePlayerSettings.queueVideo;
		this.playPlaylist = YoutubePlayerSettings.playPlaylist;
		this.feedType = YoutubeSearch.getFeedType;
		this.videos = YoutubeSearch.items;
		this.loadMore = YoutubeSearch.searchMore;
		this.getPlaylist = YoutubeVideoInfo.getPlaylist;

		YoutubeSearch.resetPageToken();
		if (!this.videos.length) {
			YoutubeSearch.search();
		}
	}

	playVideo (video) {
		this.queueVideo(video);
		this.playVideoId(video);
	}

	playPlaylist (playlist) {
		return this.getPlaylist(playlist.id).then(this.playPlaylist);
	}
}