import angular from 'angular';
import Angular2To1 from 'angular2to1';
import ngRoute from 'angular-router-browserify';
import AngularAnimate from 'angular-animate';
import AngularSanitize from 'angular-sanitize';
import AngularBootstrap from 'angular-bootstrap/ui-bootstrap-tpls.min.js';
import EchoesServices from './services/echoes.services.mdl.js';
import YoutubeDirectives from './youtube-components';
import YoutubeVideos from './youtube-videos';

ngRoute(angular);

	angular.module('echoes', [
		'ngRoute',
		AngularAnimate,
		AngularSanitize,
		'ui.bootstrap',
		EchoesServices.name,
		YoutubeDirectives.name,
		YoutubeVideos.name
		// 'htmlTemplates',
		// 'youtube.directives',
		// 'ui.controls',
		// 'ui.bootstrap',
		// 'echoes.services',
		// 'echoes.resources',
		// 'youtube.api',
		// 'youtube.playlists',
		// 'youtube.player',
		// 'youtube-videos',
		// 'media.info',
		// 'media.search',
		// 'drawer',
		// 'presets',
		// 'ngAnimate',
		// 'LocalStorageModule',
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
	function config ($routeProvider/*, localStorageServiceProvider, GapiApiSetterProvider*/) {
		// GapiApiSetterProvider.config({
		// 	scope: 'youtube',
		// 	api: { 
		// 		client: 'youtube', 
		// 		version: 'v3'
		// 	},
		// 	clientId: '971861197531'
		// });

		// localStorageServiceProvider.setPrefix('EchoesPlayer');
		console.log('inside config', $routeProvider);
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
