import './now-playlist-filter.less';
import template from './now-playlist-filter.tpl.html';

// Usage:
//  <now-playlist-filter></now-playlist-filter>
export let nowPlaylistFilter = {
  templateUrl: template,
  selector: 'nowPlaylistFilter',
  bindings: {
    playlist: '=',
    onSave: '&',
    onClear: '&',
    onChange: '&'
  },
  controller: class NowPlaylistFilterCtrl {
    /* @ngInject */
    constructor () {
      this.playlistSearch = '';
      this.showPlaylistSaver = false;
    }

    isSearchFilled() {
      return this.playlistSearch.length === 0;
    }

    // more args: $event , video, $index
    clearPlaylist($event) {
      this.onClear && this.onClear($event);
    }

    togglePlaylistSaver () {
      this.showPlaylistSaver = !this.showPlaylistSaver;
      this.onSave && this.onSave({ save: this.showPlaylistSaver });
    }

    sortVideo($item, $indexTo) {
      this.onSort && this.onSort({ $item, $indexTo });
    }

    handleFilterChange (playlistSearch) {
      this.onChange && this.onChange({ filter: playlistSearch });
    }

    clearFilter () {
      this.playlistSearch = '';
      this.handleFilterChange(this.playlistSearch);
    }
  }
};
