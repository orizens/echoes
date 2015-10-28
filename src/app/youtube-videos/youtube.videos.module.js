(function() {
    'use strict';

    angular
        .Component({
            selector: 'youtube-videos',
            bindings: [
                'echoes.services',
                'youtube.player',
                'ngRoute'
            ]
        })
        .View({
            templateUrl: 'app/youtube-videos/youtube.videos.tpl.html'
        })
        .Class({
            constructor: 'YoutubeVideosCtrl'
        });
})();