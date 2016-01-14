import angular from 'angular';
import AngularUiRouter from 'angular-ui-router';
import AppCore from '../../core';
import { YoutubeVideoComponent } from './youtube-video.component';

export default angular.module('youtube-video', [
	AppCore.name,
	AngularUiRouter
])
	.config(config)
	.directive(YoutubeVideoComponent.selector, () => YoutubeVideoComponent)
;
/* @ngInject */
function config ($stateProvider) {
	$stateProvider.state('video', {
		url: '/video/:id',
		template: '<youtube-video video="$ctrl.video"></youtube-video>',
		/* @ngInject */
		controller: function (video) {
			this.video = video;
		},
		controllerAs: '$ctrl',
		resolve: {
			/* @ngInject */
			video: function (YoutubeVideoInfo, $stateParams) {
				return YoutubeVideoInfo.list($stateParams.id).then((items) => {
					return items[0];
				});
			}
		}
	});
}