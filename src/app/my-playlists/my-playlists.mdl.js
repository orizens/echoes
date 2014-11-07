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

                .when('/playlist/:playlistId', {
					templateUrl: 'app/my-playlists/my-playlist.tpl.html',
					controller: 'MyPlaylistCtrl',
					controllerAs: 'vm',
                    resolve: {
                        videos: function($route, UserPlaylists, YoutubeVideoInfo) {
                            return UserPlaylists
                                .getPlaylist($route.current.params.playlistId)
                                .then(fetchContentDetails)
                                .then(addDuration);

                                function fetchContentDetails(response){
                                   
                                    var videoIds = response.items.map(function(video){
                                        return video.snippet.resourceId.videoId;
                                    }).join(',');

                                    return YoutubeVideoInfo.list(videoIds);
        
                                }

                                function addDuration (items) {
                                    items.forEach(function(item){
                                        item.time = YoutubeVideoInfo.toFriendlyDuration(item.contentDetails.duration);
                                    });
                                    return items;
                                }
                        }
                    }
				});
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