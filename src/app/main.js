import angular from 'angular';
import Angular2To1 from 'angular2to1';
import LocalStorageModule from 'angular-local-storage';
import EchoesServices from './services';
import EchoesComponents from './components';

	angular.module('echoes', [
		'LocalStorageModule',
		EchoesServices.name,
		EchoesComponents.name
		// 'youtube.playlists',
		// 'youtube.player',
		// 'youtube-videos',
		// 'media.info',
		// 'media.search',
		// 'drawer',
		// 'presets',
		// 'infinite-scroll',
		// 'navigator',
		// 'playlist.editor',
		// 'playlist.saver',
		// 'angular-sortable-view',
		// '720kb.socialshare',
		// 'google.api.loader',
		// 'google-signin',
		// 'user-profile'
	])
	.config(config);

	/* @ngInject */
	function config ($routeProvider, localStorageServiceProvider, GapiApiSetterProvider) {
		GapiApiSetterProvider.config({
			scope: 'youtube',
			api: { 
				client: 'youtube', 
				version: 'v3'
			},
			clientId: '971861197531'
		});

		localStorageServiceProvider.setPrefix('EchoesPlayer');

		$routeProvider

			// .when('/video/:id', {
			// 	templateUrl: 'app/youtube-video/youtube.video.tpl.html',
			// 	controller: 'YoutubeVideoCtrl',
			// 	controllerAs: 'vm',
			// })

			.otherwise({
				redirectTo: '/'
			});
	}
