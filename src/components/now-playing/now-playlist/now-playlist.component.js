import './now-playlist.less';
import template from './now-playlist.tpl.html';

export let NowPlaylistComponent = {
  templateUrl: template,
  selector: 'nowPlaylist',
  controllerAs: 'nowPlaylist',
  // or "bindings" to follow ng1.5 "component" factory
  bindings: {
    videos: '<',
    filter: '<',
    nowPlaying: '<',
    onSelect: '&',
    onRemove: '&',
    onSort: '&'
  },
  controller: class NowPlaylistCtrl {
    /* @ngInject */
    constructor () {
      // injected with this.videos, this.onRemove, this.onSelect
      this.showPlaylistSaver = false;
    }

    isPlaylistMedia(video) {
      const description = video.snippet.description;
      const hasTracks = description.match(/(\({0,1}[ ]*([0-9][0-9]):([0-9][0-9]){0,1}:{0,1}([0-9][0-9]){0,1}[ ]*\){0,1})/gim);
      return Array.isArray(hasTracks);
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
