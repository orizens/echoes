export default class YoutubePlayerCtrl {
	/* @ngInject */
	constructor(YoutubePlayerSettings, PlayerResizer, MediaInfoService, $state) {
		Object.assign(this, { YoutubePlayerSettings, PlayerResizer, MediaInfoService, $state });
		this.video = YoutubePlayerSettings.nowPlaying;
		this.nowPlaylist = YoutubePlayerSettings.nowPlaylist;
		this.size = PlayerResizer;
		this.showPlayer = YoutubePlayerSettings.showPlayer;
		this.isFullScreen = false;
		this.seek = YoutubePlayerSettings.getSeek;
		this.playNextTrack = YoutubePlayerSettings.playNextTrack;
		this.playPreviousTrack = YoutubePlayerSettings.playPreviousTrack;
		this.play = YoutubePlayerSettings.play;
		this.pause = YoutubePlayerSettings.pause;
		this.videoInfo = MediaInfoService.info;
	}

	onShowPlayer() {
		this.togglePlayer(!this.showPlayer());
	}

	togglePlayer (visible) {
		this.YoutubePlayerSettings.nowPlaying.showPlayer = visible;
	}

	toggleFullScreen () {
		this.isFullScreen = !this.isFullScreen;
		this.PlayerResizer.setFullScreen(this.isFullScreen);
		this.YoutubePlayerSettings.setSize(this.size.height, this.size.width);
	}

	addToPlaylist () {
		if (this.video.mediaId !== '') {
			this.$state.go('addVideo', { id: this.video.media.id });
		}
	}

	isPlaying () {
		// because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
		return this.YoutubePlayerSettings.getPlayerState() === 1;
	}

	seekToSeconds (seconds) {
		this.YoutubePlayerSettings.seekToSeconds(seconds);
	}
}