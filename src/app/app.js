angular.module('mediaDeck', [
	'ngRoute',
	'youtube.directives',
	'ui.controls',
	'youtube.api',
	'youtube.playlists'
])
.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
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
}]);