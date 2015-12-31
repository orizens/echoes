import angular from 'angular';
import nowPlaying from './now-playing.component.js';
import nowPlaylist from '../now-playlist';
import nowPlaylistFilter from '../now-playlist-filter';

export default angular.module('now-playing', [
	    'app.core',
	    nowPlaylist.name,
	    nowPlaylistFilter.name
	    // 'youtube.player',
    ])
    .config(config)
    .directive('nowPlaying', nowPlaying)
;
/* @ngInject */
function config () {
    
}