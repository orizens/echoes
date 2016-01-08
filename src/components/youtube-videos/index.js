import angular from 'angular';
import youtubeVideos from './youtube-videos.component.js';
import playlistEditor from '../playlist-editor';
import InfiniteScroll from 'ng-infinite-scroll';

export default angular.module('youtube-videos', [
    'app.core',
    'youtube.player',
    'ngRoute',
    playlistEditor.name,
    'infinite-scroll'
])
	.directive('youtubeVideos', youtubeVideos)
	.config(config);

/* @ngInject */
function config ($routeProvider) {
    $routeProvider
        .when('/', {
            template: '<youtube-videos></youtube-videos>'
        });
}