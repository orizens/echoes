import template from './playlist-editor.tpl.html';

// Usage:
//  <playlist-editor></playlist-editor>
// Creates:
//
export let playlistEditorComponent = {
    template,
    restrict: 'E',
    replace: true,
    scope: {},
    bindToController: true,
    controllerAs: 'playlistEditor',
    controller: class PlaylistEditorCtrl {
        /* @ngInject */
        constructor (PlaylistEditorSettings, UserPlaylists, $window) {
            var vm = this;
            Object.assign(this, { PlaylistEditorSettings, UserPlaylists, $window });
            this.playlists = this.UserPlaylists.tracks;
            this.search = '';
            this.showCreate = false;
        }

        add (playlist) {
            playlist.inProcess = true;
            this.UserPlaylists
                .addToPlaylist(playlist.id, this.PlaylistEditorSettings.getMedia())
                .then( (response) => {
                    if (response.status === 200) {
                        playlist.contentDetails.itemCount++;
                        playlist.inProcess = false;
                    }
                });
        }

        create () {
            // TODO - add description
            this.UserPlaylists.createPlaylist(this.search, '');
        }

        remove (playlist) {
            playlist.inProcess = true;
            // TODO - should check the response for errors and notify the user
            return this.UserPlaylists
                .removePlaylist(playlist.id)
                .then( (response) => playlist.inProcess = false );
        }

        isPlaylistNameExists () {
            var allTitles = this.playlists
                .map((playlist) => playlist.snippet.title.toLowerCase())
                .join(' ');
            this.showCreate = allTitles.indexOf(this.search) === -1;
        }

        hide () {
            // this.PlaylistEditorSettings.hide();
            this.$window.history.back();
        }
    }
};