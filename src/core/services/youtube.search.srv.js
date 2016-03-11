/* @ngInject */
export default function YoutubeSearch ($http, YOUTUBE_API_KEY, YoutubeVideoInfo, YoutubePlaylistInfo, localStorageService, preset){
	var url = 'https://www.googleapis.com/youtube/v3/search';
	var Storage = {
		QUERY: 'query'
	};
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
			q: localStorageService.get(Storage.QUERY),
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
	var nextPageToken;

	var exports = {
		search: search,
		setType: setType,
		setDuration: setDuration,
		setPreset: setPreset,
		items: items,
		types: types,
		params: config.params,
		getFeedType: getFeedType,
		getIsSearching: getIsSearching,
		searchMore: searchMore,
		resetPageToken: resetPageToken
	};

	return exports;

	///////////////

	function search (query, dontReset){
		var _config = { params: {} };
		if (!dontReset) {
			resetList();
		}
		isSearching = true;
		if (query && query !== config.params.q) {
			config.params.pageToken = '';
		}
		// remove properties not relevant to playlist search
		sanitize();
		config.params.q = query || config.params.q || '';
		localStorageService.set(Storage.QUERY, config.params.q);
		angular.extend(_config.params, config.params);
		_config.params.q += " " + preset.selected().label;

		return $http.get(url, _config)
			.then(fetchContentDetails)
			.then(addDuration)
			.then(finalize);

		function fetchContentDetails(response){
			var activeType = config.params.type;
			nextPageToken = response.data.nextPageToken;
			var videoIds = response.data.items.map((video) => {
				return video.id[idPropertyName[activeType]];
			}).join(',');

			var _items = infoService[activeType].list(videoIds);
			return _items;
		}

		function addDuration (_items) {
	    	if (getFeedType() === types.VIDEO) {
                _items.forEach((item) => {
                    item.time = YoutubeVideoInfo.toFriendlyDuration(item.contentDetails.duration);
                });
            }
            Array.prototype.push.apply(items, _items);
		}

		function finalize () {
			isSearching = false;
		}
	}

	function searchMore () {
		if (!isSearching && items.length) {
			config.params.pageToken = nextPageToken;
			exports.search(config.params.q, true);
		}
	}
	function resetList () {
		items.length = 0;
	}

	function resetPageToken () {
		config.params.pageToken = '';
	}

	function setType (type){
		config.params.type = type;
		resetPageToken();
		items.length = 0;
	}

	function setDuration (duration) {
		if ('' === duration || undefined === duration) {
			delete config.params.videoDuration;
			return;
		}
		config.params.videoDuration = duration;
	}

	function getDuration () {
		return config.params.videoDuration || '';
	}

	function setPreset (presetValue) {
		var query = preset.update(config.params.q, presetValue);
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

	function sanitize () {
		if (config.params.type === types.PLAYLIST) {
			delete config.params.videoDuration;
		}
	}
}