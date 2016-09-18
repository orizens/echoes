import './youtube-player.less';
import template from './youtube-player.tpl.html';

/* @ngInject */
export let YoutubePlayerComponent = {
  templateUrl: template,
  selector: 'youtubePlayer',
  bindings: {
    autoNext: '@',
    playerId: '@',
    onVideoStart: '&'            
  },
  controller: class YoutubePlayerCtrl {
    /* @ngInject */
    constructor(YoutubePlayerSettings, PlayerResizer, MediaInfoService, $state, YoutubePlayerApi) {
      Object.assign(this, { YoutubePlayerSettings, PlayerResizer, MediaInfoService, $state, YoutubePlayerApi });
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

    $onInit () {
      this.YoutubePlayerApi.load().then(() => {
        this.YoutubePlayerSettings.createPlayer(this.playerId, this.size.height, this.size.width, '');
      });
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
//     /* @ngInject */
//     function link (scope, element, attrs) {
//         YoutubePlayerApi.load().then(() => {
//             YoutubePlayerSettings.createPlayer(attrs.playerId, scope.vm.size.height, scope.vm.size.width, '', onPlayerStateChange);
//         });

//         function onPlayerStateChange (state) {
//             scope.$apply();
//         }
//     }
// }