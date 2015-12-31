import angular from 'angular';
import AngularSortableView from 'angular-sortable-view/src/angular-sortable-view.js';
import nowPlaylist from './now-playlist.component.js';

export default angular.module('now-playlist', [
	    'app.core',
	    'angular-sortable-view'
    ])
    .config(config)
    .directive('nowPlaylist', nowPlaylist)
;
/* @ngInject */
function config () {
    
}