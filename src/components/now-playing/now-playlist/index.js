import angular from 'angular';
import AngularSortableView from 'angular-sortable-view/src/angular-sortable-view.js';
import { NowPlaylistComponent } from './now-playlist.component';

export default angular.module('now-playlist', [
	    'app.core',
	    'angular-sortable-view'
    ])
    .config(config)
    .component(NowPlaylistComponent.selector, NowPlaylistComponent)
;
/* @ngInject */
function config () {

}
