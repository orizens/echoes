import angular from 'angular';
import YoutubePlaylistItem from './youtube-playlist';
import YoutubeMedia from './youtube-media';
import youtubeList from './youtube-list';

export default angular.module('youtube.directives', [
	// 'playlist.editor'
])
.directive('youtubePlaylistItem', YoutubePlaylistItem)
.directive('youtubeMedia', YoutubeMedia)
.directive('youtubeList', youtubeList)
;