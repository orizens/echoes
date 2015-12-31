/* @ngInject */
export default class PlaylistSaverCtrl {

    constructor ($scope, PlaylistSaverSettings) {
        this.$scope = $scope;
        this.playlist = PlaylistSaverSettings.playlist;
        this.inSaveMode = false;
    }

    save () {
    	this.inSaveMode = true;
    	this.PlaylistSaverSettings
            .save(this.tracks)
            .then(onSuccess, onFail);

    	function onSuccess (playlistId) {
    		this.onSave(playlistId);
    		this.inSaveMode = false;
    		this.$scope.$apply();
    	}

    	function onFail (response) {
    		console.log('failed to save tracks to playlist', response);
    	}
    }
}