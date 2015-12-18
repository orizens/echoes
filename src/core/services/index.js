import angular from 'angular';
import LocalStorageModule from 'angular-local-storage';
import YoutubeVideoInfo from './youtube.video.info.srv.js';
import PlaylistInfo from './playlist.info.srv.js';
import YoutubeSearch from './youtube.search.srv.js';
import YoutubePlaylistInfo from './youtube.playlists.info.srv.js';
import YoutubeApi from './youtube-api';
import YoutubeUserService from './youtube.user.srv.js';
import YOUTUBE_API_KEY from './constants.js';

export default angular
    .module('core.services', [
        YoutubeApi.name,
        'LocalStorageModule'
    ])
    .factory('YoutubeVideoInfo', YoutubeVideoInfo)
    .factory('PlaylistInfo', PlaylistInfo)
	.factory('YoutubePlaylistInfo', YoutubePlaylistInfo)
    .factory('YoutubeSearch', YoutubeSearch)
    .factory('YoutubeUser', YoutubeUserService)
    .constant('YOUTUBE_API_KEY', YOUTUBE_API_KEY)
;