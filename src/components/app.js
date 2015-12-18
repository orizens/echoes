(function() {
	'use strict';

	angular.module('echoes', [
		'ngRoute',
		'ngSanitize',
		'htmlTemplates',
		'youtube.directives',
		'ui.controls',
		'ui.bootstrap',
		'app.core',
		'echoes.resources',
		'youtube.api',
		'youtube.playlists',
		'youtube.player',
		'youtube-videos',
		'media.info',
		'media.search',
		'drawer',
		'presets',
		'ngAnimate',
		'LocalStorageModule',
		'infinite-scroll',
		'navigator',
		'playlist.editor',
		'playlist.saver',
		'angular-sortable-view',
		'720kb.socialshare',
		'google.api.loader',
		'google-signin',
		'user-profile'
	])
	.config(config);

	function config ($routeProvider, $locationProvider, localStorageServiceProvider, GapiApiSetterProvider) {
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

			.when('/video/:id', {
				templateUrl: 'app/youtube-video/youtube.video.tpl.html',
				controller: 'YoutubeVideoCtrl',
				controllerAs: 'vm',
			})

			.otherwise({
				redirectTo: '/'
			});
	}

})();