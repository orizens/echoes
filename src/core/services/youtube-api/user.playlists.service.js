const Apis = {
    UserPlaylists: UserPlaylists,
    ApiPlaylists: ApiPlaylists
};

export default Apis;

/* @ngInject */
function UserPlaylists($rootScope, uGapi, ApiPlaylists, $q) {
	// var api = uGapi({
 //        resourceName: 'playlists',
 //        pages: 'all'
 //    });
    var api = ApiPlaylists;
    var playlists = uGapi({
        resourceName: 'playlistItems',
        pages: 'all'
    });
    var tracks = [];
    var service = {
        tracks,
        list,
        getPlaylist,
        addToPlaylist,
        removePlaylist,
        createPlaylist
    };

    return service;

    ////////////////
    function list (user) {
        tracks.length = 0;
    	api.list().then(updateItems, onError, updateItems);
    }

    function updateItems (resource) {
    	Array.prototype.push.apply(tracks, resource.items);
    }

    function onError (err) {
    	console.log(err);
    }

    function getPlaylist (playlistId, transformFunc) {
        delete playlists.params.mine;
        playlists.params.playlistId = playlistId;
        return playlists.list({}, transformFunc);
    }

    function addToPlaylist (playlistId, media) {
        var defer = $q.defer();
        var params = {
            part: 'snippet',
            resource: {
                snippet: {
                    playlistId: playlistId,
                    resourceId: {
                        videoId: media.id,
                        playlistId: playlistId,
                        kind: 'youtube#video'
                    }
                }
            }
        };
        playlists.insert(params).then(defer.resolve, defer.reject);
        return defer.promise;
    }

    function removePlaylist (playlistId) {
        return api.remove(playlistId).then( (response) => {
            tracks.some( (playlist, index) => {
                if (playlist.id === playlistId) {
                    tracks.splice(index, 1);
                }
            });
            return response;
        });
    }

    function createPlaylist (title, description) {
        var params = {
            part: 'snippet,contentDetails',
            resource: {
                snippet: {
                    title: title,
                    description: description || ''
                }
            }
        };
        return api.insert(params).then(list);
    }

    function clearPlaylists () {
        tracks.length = 0;
    }
}
/* @ngInject */
function ApiPlaylists (uGapi) {
    return uGapi({
        resourceName: 'playlists',
        pages: 'all'
    });
}