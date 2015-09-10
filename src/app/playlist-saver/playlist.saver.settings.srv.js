(function() {
    'use strict';

    angular
        .module('playlist.saver')
        .factory('PlaylistSaverSettings', PlaylistSaverSettings);

    /* @ngInject */
    function PlaylistSaverSettings(UserPlaylists, ApiPlaylists, $q) {
    	var playlist = {
    		title: '',
    		id: '',
            description: ''
    	};

        var service = {
            save: save,
            playlist: playlist
        };
        var index = 0;
        var totalTracks;
        var defer;
        var tracks;
        return service;

        ////////////////

        function save(tracksIds) {
        	var params = {
                part: 'snippet,contentDetails',
                resource: {
                    snippet: {
                        title: playlist.title,
                        description: playlist.description || ''
                    }
                }
            };
            return ApiPlaylists.insert(params).then(function (response) {
            	playlist.id = response.result.id;
            	return addTracks(tracksIds);
            });
        }

        function addTracks (tracksIds) {
        	// var addTrackPromises = tracksIds.map(addTrack);
            defer = $q.defer();
            tracks = tracksIds;
            index = 0;
            totalTracks = tracksIds.length;
            addTrack(tracksIds[0]);
        	// return $q.when(addTrackPromises);
            return defer.promise;
        }

        function addTrack (media) {
            return UserPlaylists.addToPlaylist(playlist.id, media)
                .then(onAddSuccess, onAddFailed);

            function onAddSuccess(response) {
                index++;
                if (index < totalTracks) {
                    return addTrack(tracks[index]);
                }
                defer.resolve(playlist.id);
                reset();
                return response;
            }

            function onAddFailed (response) {
                defer.reject(response);
                return response;
            }
        }

        function reset () {
            playlist.id = '';
            playlist.title = '';
            playlist.description = '';
        }
    }
})();