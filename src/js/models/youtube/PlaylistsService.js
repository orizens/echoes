// a playlists service to create new playlists
var _ = require('underscore');
var Backbone = require('backbonejs');
var Gapi = require('../gapi.js');

var YoutubePlaylistsService = Gapi.extend({

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

	// if true, will fetch all next pages by token in response
	fetchAll: false,

	initialize: function(options) {
		//this.on('auth:success', _.bind(this.auth, this));
		if (options && options.fetchAll) {
			this.fetchAll = options.fetchAll;
		}
		this._pl_items = [];
		this.connect();
	},

	// currently, describes the "create" json
	methods: {
		insert: {
			part: 'snippet,contentDetails',
			resource: {
				snippet: {
					title: '',
					description: ''
				}
			}
		},

		list: {
			part: 'snippet,contentDetails',
			maxResults: 50,
			// id: '',
			mine: true
		},

		'delete': {
			id: ''
		}
	},

	defaults: {},

	insert: function (title, description) {
		this.methods.insert.resource.snippet = {
			title: title,
			description: description || ""
		};
		return this.create();
	},

	remove: function(id) {
		this.methods['delete'].id = id;
		return this.delete();
	},
	// because of a youtube v3 playlists bug:
	// - max-results with 50 is broken
	// - max-results is broken with nextPageToken and doesn't fetch all
	// so the parse always returns the last aggregation is succeded
	parse: function(response) {
		var hasNextToken;
		if (this.fetchAll){
			this._pl_items = this._pl_items.concat(response.items);
			hasNextToken = this.fetchNextToken(response);
			response.items = this._pl_items;
			return hasNextToken ? '' : response;
		}
		return response;
	},

	fetchNextToken: function (response) {
		var nextToken = response.nextPageToken;
		if (nextToken) {
			this.methods.list.pageToken = nextToken;
			return this.fetch();
		}
	}

});

module.exports = YoutubePlaylistsService;