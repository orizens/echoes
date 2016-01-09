import template from './now-playlist.tpl.html';

export let NowPlaylistComponent = {
    template,
    selector: 'nowPlaylist',
    controllerAs: '$ctrl',
    // or "bindings" to follow ng1.5 "component" factory
    scope: {
        videos: '=',
        filter: '=',
        nowPlaying: '=',
        onSelect: '&',
        onRemove: '&',
        onSort: '&'
    },
    bindToController: true,
    replace: true,
    restrict: 'E',
    controller:
class NowPlaylistCtrl {
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
}