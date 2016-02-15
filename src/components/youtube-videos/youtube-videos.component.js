import template from './youtube-videos.tpl.html';

// Usage:
//  <youtube-videos></youtube-videos>
export let YoutubeVideosComponent = {
	template,
	selector: 'youtubeVideos',
	controllerAs: 'youtubeVideos',
	scope: {},
	bindToController: true,
	// replace: true,
	restrict: 'E',
		/* @ngInject */
	controller: class YoutubeVideosCtrl {
		/* @ngInject */
		constructor (YoutubePlayerSettings, YoutubeSearch, YoutubeVideoInfo, PlaylistEditorSettings) {
			Object.assign(this, { YoutubePlayerSettings, YoutubeSearch, YoutubeVideoInfo, PlaylistEditorSettings });

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
			this.PlaylistEditorSettings.add(video);
			this.PlaylistEditorSettings.show();
		}
	}
};
