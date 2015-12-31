import angular from 'angular';
import nowPlaying from './now-playing.component.js';
import nowPlaylist from '../now-playlist';
import nowPlaylistFilter from '../now-playlist-filter';
import playlistSaver from '../playlist-saver';
import YoutubePlayer from '../youtube-player';

export default angular.module('now-playing', [
	    'app.core',
	    nowPlaylist.name,
	    nowPlaylistFilter.name,
	    playlistSaver.name,
	    YoutubePlayer.name
    ])
    .config(config)
    .directive('nowPlaying', nowPlaying)
;
/* @ngInject */
function config () {
    
}