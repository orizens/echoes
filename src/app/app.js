angular.module('mediaDeck', [
	'ngRoute',
	'ngSanitize',
	'youtube.directives',
	'ui.controls',
	'ui.bootstrap',
	'youtube.api',
	'youtube.playlists',
	'youtube.player',
	'media.info',
	'media.search',
	'drawer',
	'ngAnimate',
	'LocalStorageModule',
	'infinite-scroll'
])
.config(function($routeProvider, $locationProvider, localStorageServiceProvider) {

localStorageServiceProvider.setPrefix('EchoesPlayer');

$routeProvider
	.when('/', {
		templateUrl: 'app/partials/youtube.videos.tpl.html',
		controller: 'YoutubeVideosCtrl',
		controllerAs: 'vm'
	})

	.when('/video/:id', {
		templateUrl: 'app/partials/youtube.video.tpl.html',
		controller: 'YoutubeVideoCtrl'
	})

	.otherwise({
		redirectTo: '/'
	});
});