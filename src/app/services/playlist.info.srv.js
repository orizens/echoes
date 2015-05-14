(function() {
    'use strict';

    angular
        .module('echoes.services')
        .factory('PlaylistInfo', PlaylistInfo);

    /* @ngInject */
    function PlaylistInfo($http, YOUTUBE_API_KEY, YoutubeVideoInfo) {
        var url = 'https://www.googleapis.com/youtube/v3/playlistItems';
        var config = {
	      params: {
	        part: 'snippet,contentDetails',
	        key: YOUTUBE_API_KEY,
	        playlistId: '',
	        maxResults: 50
	      }
	    };
        var service = {
            list: list
        };
        return service;

        ////////////////

        function list(playlistId) {
        	config.params.playlistId = playlistId;
        	return $http.get(url, config).then(YoutubeVideoInfo.enrichItems);
        }
    }
})();