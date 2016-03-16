import template from './playlist-viewer.tpl.html';

export let PlaylistViewerComponent = {
	template,
	selector: 'playlist-viewer',
	directiveSelector: 'playlistViewer',
	controllerAs: '$ctrl',
	scope: {
		videos: '=',
		playlist: '=',
		back: '@'
	},
	bindToController: true,
	replace: true,
	restrict: 'E',
	controller: class PlaylistViewerCtrl {
		/* @ngInject */
		constructor ($state, YoutubePlayerSettings, PlaylistEditorSettings) {
			Object.assign(this, { $state, YoutubePlayerSettings, PlaylistEditorSettings });
		}

		playVideo (video) {
		    this.YoutubePlayerSettings.queuePlaylist(this.videos);
		    this.YoutubePlayerSettings.playVideoId(video);
		}
		playPlaylist() {
			this.playVideo(this.videos[0]);
		}

		queueVideo (video) {
		    this.YoutubePlayerSettings.queueVideo(video);
		}

		queuePlaylist(playlist) {
			this.YoutubePlayerSettings.queuePlaylist(playlist);
		}

		addVideo (video) {
			this.PlaylistEditorSettings.add(video);
			this.$state.go('addVideo', { id: video.id })
		}

		goBack () {
			this.$state.go(this.back);
		}
	}
};
