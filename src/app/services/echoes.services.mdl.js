import angular from 'angular';
import EchoesResources from '../resources/echoes.resources.mdl.js';
import LocalStorageModule from 'angular-local-storage';
import YoutubeVideoInfo from './youtube.video.info.srv.js';
import PlaylistInfo from './playlist.info.srv.js';
import YoutubeSearch from './youtube.search.srv.js';
import YoutubePlaylistInfo from './youtube.playlists.info.srv.js';

export default angular
        .module('echoes.services', [
            EchoesResources.name,
            'LocalStorageModule'
        ])
        .factory('YoutubeVideoInfo', YoutubeVideoInfo)
        .factory('PlaylistInfo', PlaylistInfo)
		.factory('YoutubePlaylistInfo', YoutubePlaylistInfo)
        .factory('YoutubeSearch', YoutubeSearch);
