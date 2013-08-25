define(['underscore', 'backbone', '../gapi'], function(_, Backbone, Gapi) {

	var YoutubeProfileService = Gapi.extend({

		url: function() {
			return gapi.client.youtube.channels;
		},

		// for autorization
		scopes: "https://www.googleapis.com/auth/youtube",

		// for client api to be loaded after autorization
		client: {
			api: 'youtube',
			version: 'v3'
		},

		initialize: function() {
			this.connect();
			this.listenTo(this, 'load:client', function(){
				this.fetch();
			});
		},

		defaults: {
			part: 'snippet,contentDetails',
 			mine: true
		},

		getFavoritesId: function() {
			var items = this.get('items');
			return items ? items[0].contentDetails.relatedPlaylists.favorites : '';
		}
	});

	return YoutubeProfileService;
});