/* @ngInject */
export default class YoutubePlayerCtrl {

    constructor(YoutubePlayerSettings, PlayerResizer, PlaylistEditorSettings, MediaInfoService) {
        Object.assign(this, { YoutubePlayerSettings, PlayerResizer, PlaylistEditorSettings, MediaInfoService });
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
        this.seekToSeconds = YoutubePlayerSettings.seekToSeconds;
        this.videoInfo = MediaInfoService.info;
    }

    togglePlayer (visible) {
        YoutubePlayerSettings.nowPlaying.showPlayer = visible;
    }

    toggleFullScreen () {
        this.isFullScreen = !this.isFullScreen;
        this.PlayerResizer.setFullScreen(this.isFullScreen);
        this.YoutubePlayerSettings.setSize(this.size.height, this.size.width);
    }

    addToPlaylist () {
        if (this.video.mediaId !== '') {
            this.PlaylistEditorSettings.addMedia(this.video.media);
            this.PlaylistEditorSettings.show();
        }
    }

    isPlaying () {
        // because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
        return this.YoutubePlayerSettings.getPlayerState() === 1;
    }

    playlistIsEmpty () {
        return this.YoutubePlayerSettings.nowPlaylist.length === 0;
    }

    playlistHasTracks () {
        return this.YoutubePlayerSettings.nowPlaying.index > 0 && !this.playlistIsEmpty();
    }

    playlistHasOneTrack () {
        return this.YoutubePlayerSettings.nowPlaylist.length === 1;
    }
}