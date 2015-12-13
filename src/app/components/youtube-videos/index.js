import angular from 'angular';
import template from './youtube.videos.tpl.html';
import YoutubeVideosCtrl from './youtube.videos.ctrl.js';

export default angular.module('youtube-videos', [
    'echoes.services',
    // 'youtube.player',
    'ngRoute'
])
.controller('YoutubeVideosCtrl', YoutubeVideosCtrl)
.config( ($routeProvider) => {
    $routeProvider
        .when('/', {
            template: template,
            controller: YoutubeVideosCtrl,
            controllerAs: 'vm'
        });
});

// angular
//     .Component({
//         selector: 'youtube-videos',
//         bindings: [
//             'echoes.services',
//             // 'youtube.player',
//             'ngRoute'
//         ]
//     })
//     .View({
//         template: template
//     })
//     .Class({
//         constructor: YoutubeVideosCtrl
//     });