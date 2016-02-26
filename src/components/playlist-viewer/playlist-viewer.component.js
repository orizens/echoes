import template from './playlist-viewer.tpl.html';

export let PlaylistViewerComponent = {
	template,
	selector: 'playlist-viewer',
	directiveSelector: 'playlistViewer',
	controllerAs: '$ctrl',
	scope: {
		videos: '=',
		playlist: '='
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
		    this.YoutubePlayerSettings.queuePlaylist(this.playlist);
		    this.YoutubePlayerSettings.playVideoId(video);
		    // this.YoutubePlayerSettings.nowPlaylist.length = 0;
		    // this.videos.forEach((v, index) => {
		    //     if (v === video) {
		    //         this.YoutubePlayerSettings.nowPlaying.index = index;
		    //     }
		    // });
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
	}
};
