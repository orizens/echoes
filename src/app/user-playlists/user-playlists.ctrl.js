(function() {
    'use strict';

    angular
        .module('mediaDeck')
        .controller('UserPlaylistsCtrl', UserPlaylistsCtrl)
        .factory('Gapi', Gapi);

    /* @ngInject */
    function UserPlaylistsCtrl($scope, $http, GoogleClientApi, Gapi, YoutubePlayerSettings) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'UserPlaylistsCtrl';
        vm.playlists = [];
        vm.playPlaylist = playPlaylist;

        activate();

        function activate() {
        	$scope.$on('user-signed-in', fetchPlaylists);
        }

        function playPlaylist (playlist) {
        	YoutubePlayerSettings.playPlaylistId(playlist.id, 0);
        }

        function fetchPlaylists (user) {
        	Gapi.list().then(updateItems, onError, updateItems);
        }

        function updateItems (resource) {
        	vm.playlists = vm.playlists.concat(resource.items);
        }

        function onError (err) {
        	console.log(err);
        }
    }

    function Gapi($q, $rootScope){
    	var service = {
    		list: list
    	};
    	var params = {
			part: 'snippet,contentDetails',
			maxResults: 50,
			mine: true
		};

		var tempItems
    	return service;

    	function list (args) {
    		var defer = $q.defer()
    		args = args || {};
    		gapiList(angular.copy(params, args), defer);
    		return defer.promise;
    	}

    	function gapiList(args, defer) {
    		gapi.client.youtube.playlists
    			.list(args)
    			.then(function(response){
				getNextPage(response, defer);
			});
    	}

    	function getNextPage(response, _defer) {
    		var pageToken = response.result.nextPageToken;
    		var _params = angular.copy(params);
    		_params.pageToken = pageToken;
    		if (pageToken) {
    			_defer.notify(response.result);
    			gapiList(_params, _defer);
    			return;
    		}
    		_defer.resolve(response.result);
    		$rootScope.$apply();
    	}
    }
})();