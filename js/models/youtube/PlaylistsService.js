// a playlists service to create new playlists
define(['underscore', 'backbone', '../gapi'], function(_, Backbone, Gapi) {

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
			this.tempItems = [];
			this.connect();
		},

		// currently, describes the "create" json
		methods: {
			insert: {
				part: 'snippet,status',
				resource: {
					snippet: {
						title: '',
						description: ''
					},
					status: {
						privacyStatus: 'public'
					}
				}
			},

			list: {
				part: 'snippet,contentDetails',
				maxResults: 15,
				// id: '',
				mine: true
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

		// because of a youtube v3 playlists bug:
		// - max-results with 50 is broken
		// - max-results is broken with nextPageToken and doesn't fetch all
		// so the parse always returns the last aggregation is succeded
		parse: function(response) {
			var items;
			if (this.fetchAll){
				this.tempItems = this.tempItems.concat(response.items);
				this.fetchNextToken(response);
				response.items = this.tempItems;
				return response;
			}
			response.items = this.tempItems.concat(response.items);
			this.tempItems.length = 0;
			return items;
		},

		fetchNextToken: function (response) {
			var nextToken = response.nextPageToken;
			var totalResults = response.pageInfo.totalResults;
			if (nextToken) {
				this.methods.list.pageToken = nextToken;
				this.fetch();
			}
		}

	});

	return YoutubePlaylistsService;
});