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
        // this.YoutubePlayerSettings.clear();
    }

    togglePlaylistSaver () {
        this.showPlaylistSaver = !this.showPlaylistSaver;
        this.onShow && this.onShow({ show: this.showPlaylistSaver });
    }

    sortVideo($item, $indexTo) {
        this.onSort && this.onSort({ $item, $indexTo });
    }
}