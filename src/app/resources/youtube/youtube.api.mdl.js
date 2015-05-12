(function() {
    'use strict';

    angular
        .module('youtube.api', [
            'youtube.directives'
        ])
        .factory('uGapi', uGapi);

    /* @ngInject */
    function uGapi($q, $rootScope, YoutubeApi){
    	return GapiApi;

        // config:
        //  resourceName - api to use, i.e, "playlists"
        //  pages - number of next pages to fetch
        function GapiApi(config){
            var resourceName = config.resourceName;
            var pages = config.pages || 0;
            var pagesCounter = 0;

            var defer;
            var params = {
                part: 'snippet,contentDetails',
                maxResults: 50,
                mine: true
            };
            
            var service = {
                list: list,
                params: params,
                insert: insert,
                remove: remove
            };
            return service;


        	function list (args) {
        		defer = $q.defer();
        		args = args || {};
        		gapiList(angular.copy(params, args));
        		return defer.promise;
        	}

        	function gapiList(args) {
                YoutubeApi.auth().then(function(){
                    gapi.client.youtube[resourceName]
                        .list(args)
                        .then(onGapiEnd);
                });
        	}

            function onGapiEnd (response) {
                if (pages) {
                    getNextPage(response);
                } else {
                    endPromise(response);
                }
            }

        	function getNextPage(response) {
        		var pageToken = response.result.nextPageToken;
        		var _params = angular.copy(params);
                var allowNextPage = pageToken && pages === 'all' || pagesCounter < parseInt(pages);
        		_params.pageToken = pageToken;
        		if (allowNextPage) {
        			defer.notify(response.result);
                    pagesCounter++;
        			gapiList(_params);
        			return;
        		}
                endPromise(response);
            }

            function endPromise (response) {
        		defer.resolve(response.result);
        		$rootScope.$apply();
            }

            function insert (params) {
                return gapi.client.youtube[resourceName]
                    .insert(params)
                    .then(function (response) {
                        console.log('insert method done', response);
                        return response;
                    });

            }

            function remove (playlistId) {
                var params = {
                    id: playlistId
                };
                return gapi.client.youtube[resourceName].delete(params);
            }
        }
    }
})();