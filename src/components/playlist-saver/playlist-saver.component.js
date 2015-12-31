import PlaylistSaverCtrl from './playlist-saver.ctrl.js';
import template from './playlist-saver.tpl.html';

/* @ngInject */
export default function playlistSaver () {
    // Usage:
    //	<playlist-saver></playlist-saver>
    // Creates:
    //
    var directive = {
        template,
        controller: PlaylistSaverCtrl,
        controllerAs: 'playlistSaver',
        bindToController: true,
        restrict: 'E',
        replace: true,
        scope: {
            onSave: '&?',
            onCancel: '&?',
            tracks: '='
        }
    };
    return directive;
}