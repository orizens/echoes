import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AngularAnimate from 'angular-animate';
import AppCore from '../../core';
import { UserPlaylistsComponent } from './user-playlists.component';

export default angular.module('user-playlists', [
	AppCore,
	uiRouter,
	AngularAnimate
])
	.config(config)
	.directive(UserPlaylistsComponent.controllerAs, () => UserPlaylistsComponent)
;
/* @ngInject */
function config ($stateProvider) {
	$stateProvider
	    .state('myPlaylists', {
	    	url: '/myPlaylists',
	    	template: '<user-playlists></user-playlists>'
	        // templateUrl: 'app/my-playlists/my-playlists.tpl.html',
	        // controller: 'MyPlaylistsController',
	        // controllerAs: 'vm'
	    })

	    // .state('/playlist/:playlistId', {
	    //     templateUrl: 'app/my-playlists/my-playlist.tpl.html',
	    //     controller: 'MyPlaylistCtrl',
	    //     controllerAs: 'vm',
	    //     resolve: {
	    //         videos: getPlaylistVideos,
	    //         playlist: getPlaylistInfo
	    //     }
	    // });
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