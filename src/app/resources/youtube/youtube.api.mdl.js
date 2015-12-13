import angular from 'angular';
import GoogleApiLoader from '../google-api-loader/google.api.loader.mdl.js';
import UserPlaylistsService from './user.playlists.srv.js';

export default angular
    .module('youtube.api', [
        GoogleApiLoader.name
    ])
    .factory('uGapi', uGapi)
    .factory('UserPlaylists', UserPlaylistsService.UserPlaylists)
    .factory('ApiPlaylists', UserPlaylistsService.ApiPlaylists);

/* @ngInject */
function uGapi($q, $rootScope, GapiLoader){
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


    	function list (args, transformFunc) {
    		defer = $q.defer();
    		args = args || {};
    		gapiList(angular.copy(params, args), transformFunc);
    		return defer.promise;
    	}

    	function gapiList(args, transformFunc) {
            GapiLoader.auth().then(function(){
                getAllItems(args, transformFunc).then(function (res) {
                    defer.resolve(res.result);
                });

                // gapi.client.youtube[resourceName]
                //     .list(args)
                //     .then(onGapiEnd);
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

        function getAllItems(params, transformFunc) {
            var items = [];
            var token;
            var _defer = $q.defer();
            
            getItems();

            return _defer.promise;

            function getItems () {
                return gapi.client.youtube[resourceName].list(params)
                    .then(function (response) {
                        token = response.result.nextPageToken;
                        return response;
                    })
                    .then(transformFunc)
                    .then(function (response) {
                        var returnValue = response;
                        Array.prototype.push.apply(items, response.length ? response : response.result.items);
                        if (token) {
                            params.pageToken = token;
                            return getItems();
                        }
                        // if (!response.items) {
                        //     returnValue = items;
                        // } else {
                        if (response.result) {
                            response.result.items = items;
                        }
                        if (response.length)  {
                            returnValue = {items: items};
                        }
                        // response.result.items = items;
                        _defer.resolve(returnValue);
                        return returnValue;
                    });
            }
        }

        function insert (params) {
            return gapi.client.youtube[resourceName]
                .insert(params)
                .then(function (response) {
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
