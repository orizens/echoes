(function() {
    'use strict';

    angular
        .module('playlist.editor')
        .directive('playlistEditor', playlistEditor);

    /* @ngInject */
    function playlistEditor (PlaylistEditorSettings, UserPlaylists) {
        // Usage:
        //	<playlist-editor></playlist-editor>
        // Creates:
        //
        var directive = {
            link: link,
            controller: controller,
            controllerAs: 'vm',
            restrict: 'E',
            replace: true,
            templateUrl: 'app/playlist-editor/playlist.editor.tpl.html',
            scope: {}
        };
        return directive;

        /* @ngInject */
        function controller ($scope) {
        	var vm = this;
        	vm.getMedia = PlaylistEditorSettings.getMedia;
        	vm.playlists = UserPlaylists.tracks;
        	vm.search = '';
        	vm.add = add;
        	vm.showCreate = false;
        	vm.create = create;
        	vm.remove = remove;

        	activate();

        	function activate () {
        		$scope.$watch('vm.search', function (newValue) {
        			var allTitles = vm.playlists.map(function(playlist){
        				return playlist.snippet.title;
        			}).join(' ');
    				vm.showCreate = allTitles.indexOf(newValue) === -1 ? true : false;
        		});
        	}

        	function add (playlist) {
        		playlist.inProcess = true;
        		UserPlaylists.addToPlaylist(playlist.id, vm.getMedia()).then(showAddResult);
	        	
	        	function showAddResult (response) {
	        		if (response.status === 200) {
	        			playlist.contentDetails.itemCount++;
	        			playlist.inProcess = false;
	        			$scope.$apply();
	        		}
	        	}
        	}

        	function create () {
        		// TODO - add description
        		UserPlaylists.createPlaylist(vm.search, '');
        	}

        	function remove (playlist) {
        		playlist.inProcess = true;
        		UserPlaylists.removePlaylist(playlist.id).then(function (response) {
        			playlist.inProcess = false;
        			$scope.$apply();
        		});
        	}
        }

        function link(scope, element, attrs) {
        	var $modal = element;
        	scope.isVisible = PlaylistEditorSettings.visibility;
        	scope.close = close;
        	activate();

        	function activate () {
        		scope.$watch('isVisible()', function (newVisible, oldVisible) {
        			if (!angular.equals(newVisible, oldVisible)){
        				var visibility = newVisible ? 'show' : 'hide';
        				$modal.modal(visibility);
        			}
        		});

        		$modal.on('hidden.bs.modal', function () {
        			PlaylistEditorSettings.hide();
        			scope.vm.search = '';
        			scope.$apply();
        		});
        	}

        	function close () {
        		$modal.modal('hide');
        	}
        }
    }
})();