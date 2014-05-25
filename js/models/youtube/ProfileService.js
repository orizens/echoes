define(['underscore', 'backbone', '../gapi'], function(_, Backbone, Gapi) {

	var YoutubeProfileService = Gapi.extend({

		url: function() {
			return gapi.client.youtube.channels;
		},

		// for autorization
		scopes: "https://www.googleapis.com/auth/youtube",
		immediate: true,
		// for client api to be loaded after autorization
		client: {
			api: 'youtube',
			version: 'v3'
		},

		initialize: function() {
			// this.listenTo(Backbone, 'user:authorized', this.handleAuth);
			this.listenTo(this, 'load:client', this.getProfile);
		},

		// handleAuth: function(authResult){
			// loads the client api
			// this.handleAuthResult(authResult);
		// },

		getProfile: function(){
			this.fetch();	
		},

		methods: {
			list: {
				part: 'snippet,contentDetails',
				mine: true
			}
		},

		defaults: {},

		getFavoritesId: function() {
			var items = this.get('items');
			return items ? items[0].contentDetails.relatedPlaylists.favorites : '';
		},

		// quality: high, medium, default
		picture: function (quality) {
			var items = this.get('items');
			var thumbnails = items.length ? items[0].snippet.thumbnails : {};
			var url = '';
			if (thumbnails) {
				url = thumbnails[quality] ? thumbnails[quality].url : thumbnails.default.url;
			}
			return url;
		},

		title: function(){
			var items = this.get('items');
			return items.length ? items[0].snippet.title : '';
		},

		isSignedIn: function () {
			var hasToken = gapi.auth.getToken(),
				signedIn = false;
			if (hasToken) {
				signedIn = hasToken.status && hasToken.status.google_logged_in;
			}
			return signedIn;
		}
	});

	return YoutubeProfileService;
});