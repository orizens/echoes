import angular from 'angular';
/* eslint-disable */
import AngularSortableView from 'angular-sortable-view/src/angular-sortable-view.js';
/* eslint-enable */
import { NowPlaylistComponent } from './now-playlist.component';

export default angular.module('now-playlist', [
  'angular-sortable-view'
])
  .config(config)
  .component(NowPlaylistComponent.selector, NowPlaylistComponent)
;
/* @ngInject */
function config () {

}
