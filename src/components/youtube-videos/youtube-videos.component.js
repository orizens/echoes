import YoutubeVideosCtrl from './youtube-videos.ctrl.js';
import template from './youtube-videos.tpl.html';

/* @ngInject */
export default function youtubeVideos() {
    // Usage:
    //  <youtube-videos></youtube-videos>
    // Creates:
    //
    var directive = {
        template,
        controller: YoutubeVideosCtrl,
        controllerAs: 'youtubeVideos',
        scope: {},
        bindToController: true,
        // replace: true,
        restrict: 'E'
    };
    return directive;
}