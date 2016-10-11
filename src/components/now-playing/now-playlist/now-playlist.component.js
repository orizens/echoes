import './now-playlist.less';
import template from './now-playlist.tpl.html';

export let NowPlaylistComponent = {
  templateUrl: template,
  selector: 'nowPlaylist',
  controllerAs: 'nowPlaylist',
  bindings: {
    videos: '<',
    filter: '<',
    nowPlaying: '<',
    onSelect: '&',
    onRemove: '&',
    onSort: '&',
    showPlaylistTrack: '&'
  },
  controller: class NowPlaylistCtrl {
    /* @ngInject */
    constructor () {
      // injected with this.videos, this.onRemove, this.onSelect
      this.showPlaylistSaver = false;
    }

    isPlaylistMedia(video) {
      return this.showPlaylistTrack({ video });
    }

    removeVideo($event, video, $index) {
      this.onRemove && this.onRemove({ $event, video, $index });
    }

    selectVideo (video, $index) {
      this.onSelect && this.onSelect({ video, $index });
    }

    sortVideo($item, $indexTo) {
      this.onSort && this.onSort({ $item, $indexTo });
    }
  }
};
