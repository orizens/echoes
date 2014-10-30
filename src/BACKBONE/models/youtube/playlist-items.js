// a playlists service to create new playlists
var _ = require('underscore');
var Backbone = require('backbonejs');
var Gapi = require('../gapi.js');

var history = Gapi.extend({

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

	initialize: function(id) {
		// this.connect();
	},

	// currently, describes the "create" json
	methods: {
		list: {
			part: 'snippet',
			maxResults: 50,
			playlistId: ''
		},

		insert: {
			part: 'snippet',
			resource: {
				snippet: {
					playlistId: '',
					resourceId: {
						videoId: '',
						playlistId: '',
						kind: 'youtube#video'
					}
				}
			}
		}
	},

	defaults: {},

	setId: function(id){
		this.methods.list.playlistId = id;
	},

	hasId: function() {
		return this.methods.list.playlistId !== '';
	},

	insert: function (playlistId, videoId) {
		var snippet = this.methods.insert.resource.snippet;
		snippet.playlistId = playlistId;
		snippet.resourceId.videoId = videoId;
		snippet.resourceId.playlistId = playlistId;
		this.sync('create', this);
	}
});

module.exports = history;