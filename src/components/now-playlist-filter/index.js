import angular from 'angular';
import nowPlaylistFilter from './now-playlist-filter.component.js';

export default angular.module('now-playlist-filter', [
	    'app.core'
    ])
    .directive('nowPlaylistFilter', nowPlaylistFilter)
;