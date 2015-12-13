(function() {
    'use strict';

    /* @ngInject */
    class YoutubePlayerApi {

        /* @ngInject */
        constructor ($window, $q) {
            /*jshint validthis: true */
            this.deferred = $q.defer();
            // Youtube callback when API is ready
            $window.onYouTubeIframeAPIReady = () => { 
                this.deferred.resolve() 
            };
        }

        // Injects YouTube's iFrame API
        load () {
            let validProtocols = ['http:', 'https:'];
            let url = '//www.youtube.com/iframe_api';

            // We'd prefer a protocol relative url, but let's
            // fallback to `http:` for invalid protocols
            if (validProtocols.indexOf(window.location.protocol) < 0) {
                url = 'http:' + url;
            }
            let tag = document.createElement('script');
            tag.src = url;
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            return this.deferred.promise;
        }
    }
    
    angular
       .module('youtube.player')
       .service('YoutubePlayerApi', YoutubePlayerApi);
})();