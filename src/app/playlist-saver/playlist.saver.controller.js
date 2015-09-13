(function() {
    'use strict';

    angular
        .module('playlist.saver')
        .controller('PlaylistSaverController', PlaylistSaverController);

    /* @ngInject */
    function PlaylistSaverController($scope, PlaylistSaverSettings) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'PlaylistSaverController';
        vm.save = save;
        vm.playlist = PlaylistSaverSettings.playlist;
        vm.inSaveMode = false;

        activate();

        function activate() {
        }

        function save () {
        	vm.inSaveMode = true;
        	PlaylistSaverSettings.save(vm.tracks).then(onSuccess, onFail);

        	function onSuccess (playlistId) {
        		vm.onSave(playlistId);
        		vm.inSaveMode = false;
        		$scope.$apply();
        	}

        	function onFail (response) {
        		console.log('failed to save tracks to playlist', response);
        	}
        }
    }
})();