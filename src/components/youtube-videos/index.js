import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppCore from '../../core';
import { YoutubeVideosComponent } from './youtube-videos.component.js';
import playlistEditor from '../playlist-editor';
import InfiniteScroll from 'ng-infinite-scroll';

export default angular.module('youtube-videos', [
	AppCore.name,
	'youtube.player',
	uiRouter,
	playlistEditor.name,
	'infinite-scroll'
])
	.directive(YoutubeVideosComponent.selector, () => YoutubeVideosComponent)
;
	// .config(config);

/* @ngInject */
function config ($stateProvider) {
	// $stateProvider
	//     .state('videos', {
	//         url: '/videos',
	//         template: '<youtube-videos></youtube-videos>'
	//     });
}