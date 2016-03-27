/* @ngInject */
export default class PlaylistSaverSettings {

    /* @ngInject */
    constructor (UserPlaylists, ApiPlaylists, $q) {
        Object.assign(this, { UserPlaylists, ApiPlaylists, $q });
    	this.playlist = {
    		title: '',
    		id: '',
            description: ''
    	};
        this.index = 0;
        this.totalTracks;
        this.defer;
        this.tracks;
    }
    ////////////////

    save(tracksIds) {
    	let params = {
            part: 'snippet,contentDetails',
            resource: {
                snippet: {
                    title: this.playlist.title,
                    description: this.playlist.description || ''
                }
            }
        };
        return this.ApiPlaylists.insert(params).then((response) => {
        	this.playlist.id = response.result.id;
        	return this.addTracks(tracksIds);
        });
    }

    addTracks (tracksIds) {
    	// var addTrackPromises = tracksIds.map(addTrack);
        this.defer = this.$q.defer();
        this.tracks = tracksIds;
        this.index = 0;
        this.totalTracks = tracksIds.length;
        this.addTrack(tracksIds[0]);
    	// return $q.when(addTrackPromises);
        return this.defer.promise;
    }

    addTrack (media) {
        return this.UserPlaylists
            .addToPlaylist(this.playlist.id, media)
            .then(onAddSuccess.bind(this), onAddFailed.bind(this));

        function onAddSuccess(response) {
            this.index++;
            if (this.index < this.totalTracks) {
                return this.addTrack(this.tracks[this.index]);
            }
            this.defer.resolve(this.playlist.id);
            this.reset();
            return response;
        }

        function onAddFailed (response) {
            this.defer.reject(response);
            return response;
        }
    }

    reset () {
        this.playlist.id = '';
        this.playlist.title = '';
        this.playlist.description = '';
    }
}
