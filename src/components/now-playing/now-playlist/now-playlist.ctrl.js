/* @ngInject */
export default class NowPlaylistCtrl {
    /* @ngInject */
    constructor () {
        // injected with this.videos, this.onRemove, this.onSelect
        this.showPlaylistSaver = false;
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