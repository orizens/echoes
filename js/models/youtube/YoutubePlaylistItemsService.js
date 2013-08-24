define(['underscore', 'backbone', '../gapi'], function(_, Backbone, Gapi) {

	var YoutubePlaylistItemsService = Gapi.extend({

		url: function() {
			return gapi.client.youtube.playlistItems;
		},

		// for autorization
		scopes: "https://www.googleapis.com/auth/youtube",

		// for client api to be loaded after autorization
		client: {
			api: 'youtube',
			version: 'v3'
		},

		initialize: function() {
			//this.on('auth:success', _.bind(this.auth, this));
			this.connect();
		},

		defaults: {
			part: 'snippet,status',
			resource: {
				snippet: {
					playlistId: '',
					resourceId: {
						videoId: '',
						kind: 'youtube#video'
					}
				}
			}
		},

		insert: function(playlistId, videoId) {
			this.get('resource').snippet.playlistId = playlistId;
			this.get('resource').snippet.resourceId.videoId = videoId;
			this.set('resource', this.get('resource'));
			return this.create();
		}

		// create: function() {
		// 	var request = gapi.client.youtube.playlists.insert({
		// 		part: "snippet, status",
		// 		resource: this.toJSON()
		// 	});

		// 	request.execute(function(response) {
		// 		console.log('new playlist created:', response);
		// 		// playlistId = response.result.items[0].contentDetails.uploads;
		// 		// requestVideoPlaylist(playlistId);
		// 	});
		// }

	});

	return YoutubePlaylistItemsService;
});