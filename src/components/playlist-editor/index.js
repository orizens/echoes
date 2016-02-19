import angular from 'angular';
import AngularUiRouter from 'angular-ui-router';
import AppCore from '../../core';
import { playlistEditorComponent } from './playlist-editor.component';
import PlaylistEditorSettings from './playlist-editor.settings.srv';
import AngularBootstrap from 'angular-ui-bootstrap';

export default angular.module('playlist-editor', [
    AppCore,
    AngularBootstrap,
    AngularUiRouter
])
	.config(config)
	.service('PlaylistEditorSettings', PlaylistEditorSettings)
	.directive(playlistEditorComponent.controllerAs, () => playlistEditorComponent)
;
/* @ngInject */
function config ($stateProvider) {
	$stateProvider.state('addVideo', {
		url: '/add-video/:id',
		template: '<playlist-editor></playlist-editor>',
		resolve: {
			/* @ngInject */
			video: function (YoutubeVideoInfo, $stateParams, PlaylistEditorSettings) {
				return YoutubeVideoInfo.list($stateParams.id).then((items) => {
					PlaylistEditorSettings.add(items[0])
					return items[0];
				});
			}
		}
	});
}