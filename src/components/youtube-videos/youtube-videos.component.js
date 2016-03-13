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
		constructor (YoutubePlayerSettings, YoutubeSearch, PlaylistEditorSettings, PlaylistInfo, $state) {
			Object.assign(this, { YoutubePlayerSettings, YoutubeSearch, PlaylistInfo, PlaylistEditorSettings, $state });

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
			return this.PlaylistInfo.list(playlist.id).then(this.YoutubePlayerSettings.playPlaylist);
		}

		addVideo (video) {
			this.PlaylistEditorSettings.add(video);
			this.$state.go('addVideo', { id: video.id })
		}

		queueVideo (video) {
			this.YoutubePlayerSettings.queueVideo(video);
		}
	}
}
;