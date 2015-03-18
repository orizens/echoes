(function() {
    'use strict';

    angular
        .module('youtube.playlists', [ 
        	'youtube.api',
        	'youtube.directives',
            'youtube.player'
        ])
        .config(configPlaylists);

    /* ngInject */
    function configPlaylists ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/myPlaylists', {
                templateUrl: 'app/my-playlists/my-playlists.tpl.html',
                controller: 'MyPlaylistsController',
                controllerAs: 'vm'
            })

            .when('/playlist/:playlistId', {
                templateUrl: 'app/my-playlists/my-playlist.tpl.html',
                controller: 'MyPlaylistCtrl',
                controllerAs: 'vm',
                resolve: {
                    videos: VideosService
                }
            });
    }

    /* ngInject */
    function VideosService ($route, YoutubeVideoInfo) {
        return YoutubeVideoInfo.getPlaylist($route.current.params.playlistId);
    }
})();