var _ = require('underscore');
var Backbone = require('backbonejs');
var Gapi = require('../gapi.js');

var YoutubeAuthorizer = Gapi.extend({

	url: function() {
		return gapi.client.youtube.playlists;
	},

	// for autorization
	scopes: "https://www.googleapis.com/auth/youtube",
	immediate: false,
	// for client api to be loaded after autorization
	client: {
		api: 'youtube',
		version: 'v3'
	},

	initialize: function() {
		//this.on('auth:success', _.bind(this.auth, this));
		// this.connect();
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
	signOut: function() {
		gapi.auth.signOut();
	},

	defaults: {
		snippet: {
			title: 'Alice in Chains 2 Playlist',
			description: 'A public playlist created with the YouTube API'
		},
		status: {
			privacy: 'public'
		}
	}
});

module.exports = YoutubeAuthorizer;
