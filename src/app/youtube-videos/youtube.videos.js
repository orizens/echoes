import angular from 'angular';
// import uiRouter from 'angular-ui-router';
import youtubeVideos from './youtube.videos.component';

let youtubeVideosModule = angular.module('youtube-videos', [
  // uiRouter
])
.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			template: '<youtube-videos></youtube-videos>'
		})
})
// .config(($stateProvider) => {
//   $stateProvider
//     .state('about', {
//       url: '/about',
//       template: '<about></about>'
//     });
// })

.directive('youtubeVideos', youtubeVideos);

export default youtubeVideosModule;