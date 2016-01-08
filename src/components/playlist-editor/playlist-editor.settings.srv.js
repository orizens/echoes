export default class PlaylistEditorSettings {
    /* @ngInject */
    constructor (UserPlaylists, $uibModal) {
        this.currentMedia;
        this.modalInstance;
        this.$modal = $uibModal;
    }

    add(media) {
    	this.currentMedia = media;
    }

    getMedia () {
    	return this.currentMedia;
    }

    show () {
        this.modalInstance = this.$modal.open({
          animation: true,
          template: '<playlist-editor></playlist-editor>'
        });
    }

    hide () {
    	this.modalInstance.dismiss('cancel');
    }

    clearMedia () {
        this.currentMedia = false;
    }

    visibility () {
    	return this.isVisible;
    }
}