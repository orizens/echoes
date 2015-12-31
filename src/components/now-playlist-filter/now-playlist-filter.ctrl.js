/* @ngInject */
export default class NowPlaylistFilterCtrl {
    /* @ngInject */
    // constructor (YoutubePlayerSettings) {
    constructor () {
        /*jshint validthis: true */
        // Object.assign(this, { YoutubePlayerSettings });
        this.playlistSearch = '';
        this.showPlaylistSaver = false;
    }

    clearPlaylist($event, video, $index) {
        this.onClear && this.onClear();
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
}