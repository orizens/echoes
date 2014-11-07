(function() {
	'use strict';

	angular
		.module('mediaDeck')
		.factory('YoutubeSearch', YoutubeSearch);

	/* @ngInject */
	function YoutubeSearch ($http, YOUTUBE_API_KEY, YoutubeVideoInfo, YoutubePlaylistInfo){
		var url = 'https://www.googleapis.com/youtube/v3/search';
		var types = {
			VIDEO: 'video',
			PLAYLIST: 'playlist'
		};
		var idPropertyName = {
			video: 'videoId',
			playlist: 'playlistId'
		};
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
		};

		var items = [];
		var isSearching = false;

		var exports = {
			search: search,
			setType: setType,
			setDuration: setDuration,
			items: items,
			types: types,
			params: config.params,
			getFeedType: getFeedType,
			getIsSearching: getIsSearching
		};

		return exports;

		///////////////
		
		function search (query){
			isSearching = true;
			config.params.q = query || config.params.q;
			return $http.get(url, config)
				.then(fetchContentDetails)
				.then(addDuration)
				.then(finalize);

			function fetchContentDetails(response){
				var activeType = config.params.type;
				var videoIds = response.data.items.map(function(video){
					return video.id[idPropertyName[activeType]];
				}).join(',');

				var _items = infoService[activeType].list(videoIds);
				return _items;
			}

			function addDuration (_items) {
		    	if (getFeedType() === types.VIDEO) {
	                _items.forEach(function(item){
	                    item.time = YoutubeVideoInfo.toFriendlyDuration(item.contentDetails.duration);
	                });
	            }
	            Array.prototype.push.apply(items, _items);
			}

			function finalize () {
				isSearching = false;
			}
		}

		function setType (type){
			config.params.type = type;
			items.length = 0;
		}

		function setDuration (duration) {
			config.params.videoDuration = duration;
		}

		function getFeedType () {
			return config.params.type;
		}

		function getQuery () {
			return config.params.q;
		}

		function getIsSearching () {
			return isSearching;
		}
	}

})();