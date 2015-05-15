(function() {
    'use strict';

    angular
        .module('echoes.services')
        .factory('YoutubePlaylistInfo', YoutubePlaylistInfo);

    /* @ngInject */
    function YoutubePlaylistInfo($http, YOUTUBE_API_KEY) {
        var url = 'https://www.googleapis.com/youtube/v3/playlists';
        var config = {
	      params: {
	        part: 'snippet,contentDetails',
	        key: YOUTUBE_API_KEY,
	        id: '',
	        maxResults: 50
	        // mine: false
	      }
	    };
        var service = {
            list: list
        };
        return service;

        ////////////////

        function list(id) {
        	config.params.id = id;
        	return $http.get(url, config).then(function(res){
        		return res.data.items;
        	})
        }
    }
})();