(function() {
    'use strict';

    angular
        .module('youtube.playlists', [ 
        	'youtube.api',
        	'youtube.directives'
        ])
        .config(function($routeProvider, $locationProvider) {
			$routeProvider
				.when('/myPlaylists', {
					templateUrl: 'app/my-playlists/my-playlists.tpl.html',
					controller: 'MyPlaylistsCtrl',
					controllerAs: 'vm'
				})
		})
        .controller('MyPlaylistsCtrl', MyPlaylistsCtrl);

    /* @ngInject */
    function MyPlaylistsCtrl($scope, UserPlaylists) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'MyPlaylistsCtrl';
        vm.playlists = UserPlaylists.tracks;
        vm.playVideo = playVideo;
        // activate();

        // function activate() {
        // }
        function playVideo (playlist) {
        	console.log('playing playlist', playlist);
        }
    }
})();