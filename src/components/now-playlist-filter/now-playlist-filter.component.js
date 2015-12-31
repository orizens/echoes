import NowPlaylistFilterCtrl from './now-playlist-filter.ctrl.js';
import template from './now-playlist-filter.tpl.html';

/* @ngInject */
export default function nowPlaylistFilter() {
    // Usage:
    //  <now-playlist-filter></now-playlist-filter>
    // Creates:
    //
    var directive = {
        template,
        controller: NowPlaylistFilterCtrl,
        controllerAs: 'nowPlaylistFilter',
        scope: {
            playlist: '=',
            onSave: '&',
            onClear: '&',
            onChange: '&'
        },
        bindToController: true,
        replace: true,
        restrict: 'E'
    };
    return directive;
}