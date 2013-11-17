define(['underscore', 'backbone', '../gapi'], function(_, Backbone, Gapi) {

	var YoutubeAuthorizer = Gapi.extend({

		url: function() {
			return gapi.client.youtube.playlists;
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


		// this will be invoked on auth:success event
		check: function() {
			// var config = {
			// 	'client_id': '971861197531',
			// 	'scope': 'https://www.googleapis.com/auth/youtube/v3'
			// };
			// gapi.auth.authorize(config, function() {
			// console.log('login complete');
			// console.log(gapi.auth.getToken());
			// });
		},

		// gapi: function() {
		// 	gapi.client.load(this.client.api, this.client.version, function() {
		// 		return;

		// 		// https://developers.google.com/youtube/v3/docs/channels/list
		// 		var request = gapi.client.youtube.playlists.insert({
		// 			// mine: '' indicates that we want to retrieve the channel for the authenticated user.
		// 			part: 'snippet,status',
		// 			resource: this.toJSON()
		// 		});
		// 		request.execute(function(response) {
		// 			console.log('new playlist created:', response);
		// 			// playlistId = response.result.items[0].contentDetails.uploads;
		// 			// requestVideoPlaylist(playlistId);
		// 		});
		// 	});

		// 	// gapi.client.load('youtube', 'v3', _.bind(this.onload, this));
		// },

		// onload: function() {
		// 	this.create();
		// },

		defaults: {
			snippet: {
				title: 'Alice in Chains 2 Playlist',
				description: 'A public playlist created with the YouTube API'
			},
			status: {
				privacy: 'public'
			}
		},

		create: function() {
			var request = gapi.client.youtube.playlists.insert({
				part: "snippet, status",
				resource: this.toJSON()
			});

			request.execute(function(response) {
				console.log('new playlist created:', response);
				// playlistId = response.result.items[0].contentDetails.uploads;
				// requestVideoPlaylist(playlistId);
			});
		}

	});

	return YoutubeAuthorizer;
});