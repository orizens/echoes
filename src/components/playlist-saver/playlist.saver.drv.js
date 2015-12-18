(function() {
'use strict';

    angular
        .module('playlist.saver')
        .directive('playlistSaver', playlistSaver);

    /* @ngInject */
    function playlistSaver () {
        // Usage:
        //	<playlist-saver></playlist-saver>
        // Creates:
        //
        var directive = {
            controller: 'PlaylistSaverController',
            bindToController: true,
            controllerAs: 'vm',
            restrict: 'E',
            replace: true,
            templateUrl: 'app/playlist-saver/playlist.saver.tpl.html',
            scope: {
                onSave: '&?',
                onCancel: '&?',
                tracks: '='
            }
        };
        return directive;
    }
})();