(function() {
    'use strict';

    angular
        .module('playlist.editor')
        .controller('PlaylistEditorCtrl', PlaylistEditorCtrl);

    /* @ngInject */
    function PlaylistEditorCtrl (PlaylistEditorSettings, UserPlaylists) {
        /*jshint validthis: true */
    	var vm = this;
    	vm.getMedia = PlaylistEditorSettings.getMedia;
    	vm.playlists = UserPlaylists.tracks;
    	vm.search = '';
    	vm.add = add;
    	vm.showCreate = false;
        vm.isPlaylistNameExists = isPlaylistNameExists;
    	vm.create = create;
    	vm.remove = remove;

    	// activate();

    	// function activate () {}

    	function add (playlist) {
    		playlist.inProcess = true;
    		UserPlaylists.addToPlaylist(playlist.id, vm.getMedia()).then(showAddResult);
        	
        	function showAddResult (response) {
        		if (response.status === 200) {
        			playlist.contentDetails.itemCount++;
        			playlist.inProcess = false;
        		}
        	}
    	}

    	function create () {
    		// TODO - add description
    		UserPlaylists.createPlaylist(vm.search, '');
    	}

    	function remove (playlist) {
    		playlist.inProcess = true;
    		return UserPlaylists.removePlaylist(playlist.id).then( (response) => {
                // TODO - should check the response for errors and notify the user
    			playlist.inProcess = false;
    		});
    	}

        function isPlaylistNameExists () {
            var allTitles = vm.playlists.map((playlist) => {
                return playlist.snippet.title.toLowerCase();
            }).join(' ');
            vm.showCreate = allTitles.indexOf(vm.search) === -1;
        }
    }
}());