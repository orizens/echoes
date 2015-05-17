(function() {
	'use strict';

	angular
	.module('echoes.services')
	.factory('YoutubeVideoInfo', YoutubeVideoInfo);

	function YoutubeVideoInfo ($q, $http, YOUTUBE_API_KEY, UserPlaylists){
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
			enrichItems: enrichItems,
			enrichItemsInBulk: enrichItemsInBulk
		};

		return service;

		////////////////////////
		
		function list(id) {
			setId(id);
			var _config = {
				params: angular.extend({}, config.params)
			};
			return $http.get(url, _config).then(function(res){
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
			var defer = $q.defer();
			UserPlaylists
			.getPlaylist(playlistId)
			.then(function (res) {
				return enrichItemsInBulk(res.items).then(function (res) {
					var videos = [];
					res[0].forEach(function (items) {
						videos = videos.concat(items);
					});
					defer.resolve(videos);
				});
            });
            return defer.promise;
			// .then(fetchContentDetails)
			// .then(addDuration);
		}
		
		function enrichItemsInBulk (items) {
			var amount = items.length;
			var pages = Math.ceil(amount / 50);
			var _items = [];
			var promises = [];
			for (var i = 0; i < pages; i++) {
				promises.push(createPromise(items, i));
			}
			return $q.all(promises);

			function createPromise (items, i) {
				var start = i * 50;
				var end = (i + 1) * 50;
				return fetchContentDetails({
						items: items.slice(start, end)
					})
					.then(addDuration)
					.then(function (videos) {
						_items[i] = videos;
						return _items;
				});
			}
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
			return fetchContentDetails(response.result || response.data)
				.then(addDuration);
		}
	}

})();