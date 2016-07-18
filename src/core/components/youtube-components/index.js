import angular from 'angular';
import YoutubePlaylistItem from './youtube-playlist';
import {
	YoutubeMedia
}
from './youtube-media';
import { YoutubeList } from './youtube-list';

export default angular.module('youtube.components', [
		// 'playlist.editor'
	])
	.directive('youtubePlaylistItem', YoutubePlaylistItem)
	.component(YoutubeMedia.selector, YoutubeMedia)
	.component(YoutubeList.selector, YoutubeList);
