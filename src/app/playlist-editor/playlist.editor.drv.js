(function() {
    'use strict';

    angular
        .module('playlist.editor')
        .directive('playlistEditor', playlistEditor);

    /* @ngInject */
    function playlistEditor (PlaylistEditorSettings) {
        // Usage:
        //	<playlist-editor></playlist-editor>
        // Creates:
        //
        var directive = {
            link: link,
            controller: 'PlaylistEditorCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            replace: true,
            templateUrl: 'app/playlist-editor/playlist.editor.tpl.html',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs) {
        	var $modal = element;
        	scope.isVisible = PlaylistEditorSettings.visibility;
        	scope.close = close;
        	activate();

        	function activate () {
        		scope.$watch('isVisible()', (newVisible, oldVisible) => {
        			if (!angular.equals(newVisible, oldVisible)){
        				var visibility = newVisible ? 'show' : 'hide';
        				$modal.modal(visibility);
        			}
        		});

        		$modal.on('hidden.bs.modal', () => {
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