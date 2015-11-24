import template from './youtube.videos.tpl.html';
import controller from './youtube.videos.controller';

let youtubeVideos = function () {
  return {
    restrict: 'E',
    scope: {},
    template,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

export default youtubeVideos;
// (function() {
//     'use strict';

//     angular
//         .Component({
//             selector: 'youtube-videos',
//             bindings: [
//                 'echoes.services',
//                 'youtube.player',
//                 'ngRoute'
//             ]
//         })
//         .View({
//             templateUrl: 'app/youtube-videos/youtube.videos.tpl.html'
//         })
//         .Class({
//             constructor: 'YoutubeVideosCtrl'
//         });
// })();