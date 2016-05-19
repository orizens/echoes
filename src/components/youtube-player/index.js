import angular from 'angular';
import MediaInfoService from './media-info.service.js';
import AngularSocialShare from 'angular-socialshare';
import youtubePlayer from './youtube-player.component.js';
import YoutubePlayerApi from './youtube-player.api.srv.js';
import YoutubePlayerCreator from './youtube-player.creator.srv.js';
import YoutubePlayerSettings from './youtube.player.settings.srv.js';
import PlayerResizer from './player.resizer.srv.js';
import playerResizer from './player.resizer.component.js';
import PlayerControls from './player-controls';
import MediaInfo from './media-info';

export default angular.module('youtube.player', [
	'LocalStorageModule',
	'720kb.socialshare',
	PlayerControls,
	MediaInfo
])
	.config(config)
	.factory('MediaInfoService', MediaInfoService)
	.directive('youtubePlayer', youtubePlayer)
	.service('YoutubePlayerApi', YoutubePlayerApi)
	.service('YoutubePlayerCreator', YoutubePlayerCreator)
	.factory('YoutubePlayerSettings', YoutubePlayerSettings)
	.factory('PlayerResizer', PlayerResizer)
	.directive('playerResizer', playerResizer)
;

/* @ngInject */
function config () {
	
}