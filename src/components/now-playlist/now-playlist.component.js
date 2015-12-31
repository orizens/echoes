import NowPlaylistCtrl from './now-playlist.ctrl.js';
import template from './now-playlist.tpl.html';

/* @ngInject */
export default function nowPlaylist() {
    // Usage:
    //  <now-playlist></now-playlist>
    // Creates:
    //
    var directive = {
        template,
        controller: NowPlaylistCtrl,
        controllerAs: 'nowPlaylist',
        scope: {
            videos: '=',
            nowPlaying: '=',
            onSelect: '&',
            onRemove: '&',
            onSort: '&'
        },
        bindToController: true,
        replace: true,
        restrict: 'E'
    };
    return directive;
}