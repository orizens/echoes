import angular from 'angular';
import { PlaylistSaverComponent } from './playlist-saver.component';
import PlaylistSaverSettings from './playlist-saver-settings.srv.js';

export * from './playlist-saver.component';
export default angular.module('playlist-saver', [
		'app.core'
	])
	.service('PlaylistSaverSettings', PlaylistSaverSettings)
	.component(PlaylistSaverComponent.selector, PlaylistSaverComponent)
.name;