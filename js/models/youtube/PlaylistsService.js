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

		initialize: function() {
			//this.on('auth:success', _.bind(this.auth, this));
			this.connect();
		},

		// currently, describes the "create" json
		defaults: {
			v_3: {
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
					id: ''
				}
			}
		},

		insert: function (title, description) {
			this.get('v_3').insert.resource.snippet = {
				title: title,
				description: description || ""
			};
			return this.create();
		}

	});

	return YoutubePlaylistsService;
});