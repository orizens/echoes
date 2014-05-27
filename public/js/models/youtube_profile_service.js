define([
	'underscore',
	'backbone',
	'vars',
	'collections/youtube_playlists_provider',
	'./youtube/ProfileService',
	'models/youtube/gplusAuth'
], function(_, Backbone, vars, YoutubePlaylistsProvider, ProfileService, GPlusAuth) {
   
    var YoutubeProfileService = Backbone.Model.extend({
		playlists: new YoutubePlaylistsProvider(),
		auth: new GPlusAuth(),
		profile: new ProfileService(),

		safe: {
			key: 'Echoes-YoutubeProfileService',
			options: {
				reload: false
			}
		},

		initialize: function() {
			this.on('change:token', this.fetchProfile, this);
			// this.listenTo(, this.onProfileChange, this);
			// this.userPlaylists = new Backbone.Collection();
			this.safe.reload();
		},

		onProfileChange: function(user){
			this.playlists.username = user.getUsername();
			this.playlists.fetch();
		},

		cred: {
			clientId: "971861197531.apps.googleusercontent.com",
			clientSecret: "t7KrdesISXI-4ViBJ5jZOXSt",
			token: ""
		},
		
		// authUrls
		signinUrl: function(){
			return [ 
			"https://accounts.google.com/o/oauth2/auth?",
			"client_id=" + this.cred.clientId + "&",
			"redirect_uri=" + vars.youtube.redirect_uri + "&",
			"scope=https://gdata.youtube.com&",
			"response_type=token"
			].join('');
		},

		refreshToken: function(){
			return [
			"https://accounts.google.com/o/oauth2/token?",
			"client_id=" + this.cred.clientId + "&",
			"client_secret=" + this.cred.clientSecret + "&",
			"refresh_token=" + this.get('token') + "&",
			"grant_type=refresh_token"
			].join('');
		},
		
		// profile: function(){
		// 	var token = this.get('token'),
		// 		url = "";
		// 	if (token) {
		// 		url = "https://gdata.youtube.com/feeds/api/users/default?access_token=" + this.get('token') + "&alt=json&v=2";
		// 	}
		// 	return url;
		// },

		signin: function() {
			return this.signinUrl();
		},
			// require([this.authUrls.signin.call(this)], _.bind(this.onProfileChange, this));

		fetchProfile: function(model, token){
			this.cred.token = token;
			this.url = this.profile();
			if (this.url) {
				this.fetch();
			}
		},

		setToken: function(token) {
			this.set('token', token);
		},

		parse: function(response){
			if (response) {
				this.set(response.entry);
			}
		},

		getUsername: function() {
			return this.get('yt$username') ? this.get('yt$username').$t : '';
		},

		getDisplayUsername: function () {
			return this.get('yt$username') ? this.get('yt$username').display : 'Username';
		},

		getThumbnail: function() {
			return this.get('media$thumbnail') ? this.get('media$thumbnail').url : '';
		},
		
		// signIn: function () {
		// 	var onAuthSuccess = function(authResult){
		// 		console.log('G+ AUTH SUCCESS: ', authResult);
		// 		this.profile.fetch();
		// 	};
		// 	// this.auth.off('auth:success', onAuthSuccess);
		// 	// this.auth.on('auth:success', onAuthSuccess);
		// 	// this.auth.auth()
		// 	this.profile.on('auth:success',function(){
		// 		this.profile.fetch();
		// 	});
		// 	this.profile.connect();
		// },

		signOut: function(){
			this.auth.signOut();
		},

		getClientId: function(){
			return this.auth.clientId();
		}
	});
   
    return YoutubeProfileService; 
});