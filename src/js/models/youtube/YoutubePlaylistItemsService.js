// playlist resource - to update a playlist with a new video
var _ = require('underscore');
var Backbone = require('backbonejs');
var Gapi = require('../gapi.js');

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
		// this.connect();
	},
	methods: {
		insert: {
			part: 'snippet,status,contentDetails',
			resource: {
				snippet: {
					playlistId: '',
					resourceId: {
						videoId: '',
						kind: 'youtube#video'
					}
				}
			}
		}
	},

	defaults: {
		message: ""
	},

	insert: function(videoId) {
		var playlistModel = this.get('v_3');
		playlistModel.insert.resource.snippet.playlistId = this.id;
		playlistModel.insert.resource.snippet.resourceId.videoId = videoId;
		this.set('v_3', playlistModel);
		return this.create();
	},

	// external api
	getTitle: function(){
		return this.attributes.snippet.title;
	}
});

module.exports = YoutubePlaylistItemsService;