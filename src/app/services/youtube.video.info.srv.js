(function() {
	'use strict';

	angular
	.module('echoes.services')
	.factory('YoutubeVideoInfo', YoutubeVideoInfo);

	function YoutubeVideoInfo ($http, YOUTUBE_API_KEY, UserPlaylists){
		var url = 'https://www.googleapis.com/youtube/v3/videos';
		var config = {
			params: {
				part: 'snippet,contentDetails,statistics',
				key: YOUTUBE_API_KEY,
				id: '',
				maxResults: 50
			}
		};

		var service = {
			list: list,
			setId: setId,
			toFriendlyDuration: toFriendlyDuration,
			getPlaylist: getPlaylist,
			enrichItems: enrichItems
		};

		return service;

		////////////////////////
		
		function list(id) {
			setId(id);
			return $http.get(url, config).then(function(res){
				return res.data.items;
			});
		}

		function setId(id) {
			config.params.id = id;
		}

		function toFriendlyDuration (time) {
			var t = time.split("PT")[1];
			var ts = '';
			if (t) {
				t = t.replace(/(H|M)/g, ":")
				.replace("S", "");
				ts = t.split(":");
				ts = ts.map(function(d){
					return d.length === 1 ? "0" + d : d;
				});
			} else {
				t = time.split("P")[1];
				t = t.replace("D", "");
				ts = [parseInt(t) * 24, ':00:00'];
			}
			return ts.join(":");
		}

		function getPlaylist (playlistId) {
			return UserPlaylists
			.getPlaylist(playlistId)
			.then(fetchContentDetails)
			.then(addDuration);
		}
		
		function fetchContentDetails(data){
			var videoIds = data.items.map(function(video){
				return video.snippet.resourceId.videoId;
			}).join(',');

			return list(videoIds);
		}

		function addDuration (items) {
			items.forEach(function(item){
				item.time = toFriendlyDuration(item.contentDetails.duration);
			});
			return items;
		}

		function enrichItems (response) {
			return fetchContentDetails(response.data)
				.then(addDuration);
		}
	}

})();