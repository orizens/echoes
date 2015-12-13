import angular from 'angular';
import YoutubeApi from './youtube/youtube.api.mdl.js';
import YoutubeUserService from './youtube/youtube.user.srv.js';
import YOUTUBE_API_KEY from './constants.js';

export default angular
        .module('echoes.resources', [
            YoutubeApi.name,
        ])
        .factory('YoutubeUser', YoutubeUserService)
        .constant('YOUTUBE_API_KEY', YOUTUBE_API_KEY);
