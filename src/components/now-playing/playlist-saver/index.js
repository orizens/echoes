import angular from 'angular';
import { PlaylistSaverComponent } from './playlist-saver.component.js';
import PlaylistSaverSettings from './playlist-saver-settings.srv.js';

export default angular.module('playlist-saver', [
		'app.core'
	])
	.service('PlaylistSaverSettings', PlaylistSaverSettings)
	.directive(PlaylistSaverComponent.directiveSelector, () => PlaylistSaverComponent)
;