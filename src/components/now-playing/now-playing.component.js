import NowPlayingCtrl from './now-playing.ctrl.js';
import template from './now-playing.tpl.html';

/* @ngInject */
export default function nowPlayling() {
    // Usage:
    //  <now-playling></now-playling>
    // Creates:
    //
    var directive = {
        template,
        controller: NowPlayingCtrl,
        controllerAs: 'nowPlaying',
        scope: {},
        bindToController: true,
        replace: true,
        restrict: 'E'
    };
    return directive;
}