import angular from 'angular';
import AppCore from '../../core';
import { playlistEditorComponent } from './playlist-editor.component';
import PlaylistEditorSettings from './playlist-editor.settings.srv';
import AngularBootstrap from 'angular-ui-bootstrap';

export default angular.module('playlist-editor', [
        AppCore.name,
        AngularBootstrap
    ])
	.service('PlaylistEditorSettings', PlaylistEditorSettings)
	.directive(playlistEditorComponent.controllerAs, () => playlistEditorComponent)
;