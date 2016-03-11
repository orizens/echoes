import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppCore from '../../core';
import playlistEditor from '../playlist-editor';
import { PlaylistViewerComponent } from './playlist-viewer.component';

export default angular.module('playlist-viewer', [
	AppCore,
	uiRouter,
	playlistEditor.name
])
	.config(config)
	.directive(PlaylistViewerComponent.directiveSelector, () => PlaylistViewerComponent)
;
/* @ngInject */
function config ($stateProvider) {
	$stateProvider
		.state('playlist', {
			url: '/playlist/:playlistId',
			template: '<playlist-viewer videos="vm.videos" playlist="vm.playlist"></playlist-viewer>',
			controller: function (videos, playlist) {
				this.videos = videos;
				this.playlist = playlist[0];
			},
			controllerAs: 'vm',
			resolve: {
			    videos: getPlaylistVideos,
			    playlist: getPlaylistInfo
			}
		})
}

/* ngInject */
function getPlaylistVideos ($stateParams, YoutubeVideoInfo, PlaylistInfo, YoutubeUser) {
    var playlistId = $stateParams.playlistId;
    return YoutubeUser.isUserSignedIn() ?
        YoutubeVideoInfo.getPlaylist(playlistId) :
        PlaylistInfo.list(playlistId);
}

/* @ngInject */
function getPlaylistInfo ($stateParams, YoutubePlaylistInfo) {
    return YoutubePlaylistInfo.list($stateParams.playlistId);
}