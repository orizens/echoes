import './youtube-player.less';
import template from './youtube-player.tpl.html';

export let YoutubePlayerComponent = {
  templateUrl: template,
  selector: 'youtubePlayer',
  bindings: {
    playerId: '@',
    autoNext: '@',
    onVideoStart: '&'            
  },
  controller: class YoutubePlayerCtrl {
    /* @ngInject */
    constructor(YoutubePlayerSettings, PlayerResizer, MediaInfoService, $state, YoutubePlayerApi, $scope) {
      Object.assign(this, { YoutubePlayerSettings, PlayerResizer, MediaInfoService, $state, YoutubePlayerApi, $scope });
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
      this.shares = [
        { title: 'Share To Google+', provider: 'google+', icon: 'fa fa-google-plus-square', color: 'danger' },
        { title: 'Share To Twitter', provider: 'twitter', icon: 'fa fa-twitter-square', color: 'info' },
        { title: 'Share To Facebook', provider: 'facebook', icon: 'fa fa-facebook-square', color: 'info' }
      ];
    }
    
    $postLink () {
      const scope = this.$scope;
      this.YoutubePlayerApi.load().then(() => {
        this.YoutubePlayerSettings.createPlayer(this.playerId, this.size.height, this.size.width, '', onPlayerStateChange);
      });

      function onPlayerStateChange (state) {
        scope.$apply();
      }
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

    hasContent () {
      return this.videoInfo.thumb !== '';
    }
  }
};