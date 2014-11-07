(function() {
    'use strict';

    angular
        .module('youtube.api')
        .factory('UserPlaylists', UserPlaylists);

    /* @ngInject */
    function UserPlaylists($rootScope, uGapi) {
    	var api = uGapi({ 
            resourceName: 'playlists',
            pages: 'all'
        });
        var playlists = uGapi({
            resourceName: 'playlistItems'
        });
        var tracks = [];
        var service = {
            tracks: tracks,
            list: list,
            getPlaylist: getPlaylist
        };
        activate();

        return service;

        ////////////////
        function activate () {
        	$rootScope.$on('user-signed-in', list);
        }

        function list (user) {
        	api.list().then(updateItems, onError, updateItems);
        }

        function updateItems (resource) {
        	Array.prototype.push.apply(tracks, resource.items);
        }

        function onError (err) {
        	console.log(err);
        }

        function getPlaylist (playlistId) {
            delete playlists.params.mine;
            playlists.params.playlistId = playlistId;
            return playlists.list();
        }
    }
})();