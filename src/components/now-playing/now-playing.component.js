import template from './now-playing.tpl.html';

// Usage:
//  <now-playling></now-playling>
// Creates:
//  a top level (SMART/Container) component for managing now playing playlist
export let nowPlayingComponent = {
  templateUrl: template,
  selector: 'nowPlaying',
  controllerAs: 'nowPlaying',
  controller: class NowPlayingCtrl {
    /* @ngInject */
    constructor (YoutubePlayerSettings, UserPlaylists) {
      Object.assign(this, { YoutubePlayerSettings, UserPlaylists });
      this.playlist = YoutubePlayerSettings.nowPlaylist;
      this.nowPlaying = YoutubePlayerSettings.nowPlaying;
      this.playlistSearch = '';
      this.showPlaylistSaver = false;
    }

    removeVideo($event, video, $index) {
      $event.stopPropagation();
      this.YoutubePlayerSettings.remove(video, $index);
    }

    playVideo (video, index) {
      this.nowPlaying.index = index;
      this.YoutubePlayerSettings.playVideoId(video);
    }

    togglePlaylistSaver() {
      this.showPlaylistSaver = !this.showPlaylistSaver;
    }

    onPlaylistSave () {
      this.togglePlaylistSaver();
      this.UserPlaylists.list();
    }

    updateIndex ($item, $indexTo) {
      if ($item.id === this.nowPlaying.media.id) {
        this.nowPlaying.index = $indexTo;
      }
    }

    clearPlaylist () {
      this.YoutubePlayerSettings.clear();
    }

    onFilterChange (filter) {
      this.playlistSearch = filter;
    }
  }
};
