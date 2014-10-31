(function() {
	'use strict';

	angular
		.module('mediaDeck')
		.service('YoutubeSearch', YoutubeSearch);

	/* @ngInject */
	function YoutubeSearch ($http, YOUTUBE_API_KEY, YoutubeVideoInfo, YoutubePlaylistInfo){
		var url = 'https://www.googleapis.com/youtube/v3/search';
		var types = this.types = {
			VIDEO: 'video',
			PLAYLIST: 'playlist'
		};
		var idPropertyName = {
			video: 'videoId',
			playlist: 'playlistId'
		}
		var config = {
			params: {
				part: 'snippet,id',
				key: YOUTUBE_API_KEY,
				q: '',
				maxResults: 50,
				type: types.VIDEO
			}
		};
		var infoService = {
			video: YoutubeVideoInfo,
			playlist: YoutubePlaylistInfo
		}

		this.search = function(query){
			config.params.q = query;
			return $http.get(url, config).then(fetchContentDetails);

			function fetchContentDetails(response){
				var activeType = config.params.type;
				var videoIds = response.data.items.map(function(video){
					return video.id[idPropertyName[activeType]];
				}).join(',');

				return infoService[activeType].list(videoIds);
			};
		};

		this.setType = function(type){
			config.params.type = type;
		};

		this.setDuration = function (duration) {
			config.params.videoDuration = duration;
		};
	}

})();