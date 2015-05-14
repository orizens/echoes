(function() {
    'use strict';

    angular
        .module('youtube.playlists', [ 
        	'youtube.api',
        	'youtube.directives',
            'youtube.player',
            'echoes.resources'
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
                    videos: getPlaylistVideos,
                    playlist: getPlaylistInfo
                }
            });
    }

    /* ngInject */
    function getPlaylistVideos ($route, YoutubeVideoInfo, PlaylistInfo, YoutubeUser) {
        var playlistId = $route.current.params.playlistId;
        return YoutubeUser.isSignedIn() ? 
            YoutubeVideoInfo.getPlaylist(playlistId) :
            PlaylistInfo.list(playlistId);
    }

    /* @ngInject */
    function getPlaylistInfo ($route, YoutubePlaylistInfo) {
        return YoutubePlaylistInfo.list($route.current.params.playlistId);
    }
})();