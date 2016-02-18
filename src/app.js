import angular from 'angular';
// import Angular2To1 from 'angular2to1';
import AngularUiRouter from 'angular-ui-router';
import AngularAnimate from 'angular-animate';
import AngularSanitize from 'angular-sanitize';
import AngularBootstrap from 'angular-ui-bootstrap';
/*eslint-disable */
import LocalStorageModule from 'angular-local-storage';
/*eslint-enable */
import AppCore from './core';

import YoutubeVideos from './components/youtube-videos';
import Loader from './components/loader';
import SearchPanel from './components/search-panel';
import YoutubePlayer from './components/youtube-player';
import NowPlaying from './components/now-playing';
import UserProfile from './components/user-profile';
import Drawer from './components/drawer';
import PlaylistEditor from './components/playlist-editor';
import YoutubeVideo from './components/youtube-video';
import UserPlaylists from './components/user-playlists';

angular.module('echoes', [
	// framework wide components
	AngularUiRouter,
	AngularAnimate,
	AngularSanitize,
	AngularBootstrap,

	// services
	'LocalStorageModule',
	AppCore.name,

	// ui-components
	YoutubeVideos.name,
	Loader.name,
	SearchPanel.name,
	NowPlaying.name,
	YoutubePlayer.name,
	UserProfile.name,
	Drawer.name,
	PlaylistEditor.name,
	YoutubeVideo.name,
	UserPlaylists.name
	// '720kb.socialshare',
])
.config(config);

/* @ngInject */
function config ($stateProvider, $urlRouterProvider, localStorageServiceProvider, GapiApiSetterProvider) {
	GapiApiSetterProvider.config({
		scope: 'youtube',
		api: {
			client: 'youtube',
			version: 'v3'
		},
		clientId: '971861197531'
	});

	localStorageServiceProvider.setPrefix('EchoesPlayer');

	$stateProvider
		.state('videos', {
			url: '/',
			template: '<youtube-videos></youtube-videos>'
		});

	$urlRouterProvider.otherwise('/');
}
