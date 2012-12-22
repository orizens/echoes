define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
    var YoutubeProfileService = Backbone.Model.extend({
		cred: {
			clientId: "971861197531.apps.googleusercontent.com",
			clientSecret: "",
			token: ""
		},
		
		// authUrls
		signinUrl: function(){
			return [ 
			"https://accounts.google.com/o/oauth2/auth?",
			"client_id=" + this.cred.clientId + "&",
			"redirect_uri=http://localhost:1234/echoes/&",
			"scope=https://gdata.youtube.com&",
			"response_type=token"
			].join('');
		},

		refreshToken: function(){
			return [
			"https://accounts.google.com/o/oauth2/token?",
			"client_id=" + cred.clientId + "&",
			"client_secret=" + cred.clientSecret + "&",
			"refresh_token=" + cred.token + "&",
			"grant_type=refresh_token"
			].join('');
		},
		
		profile: function(){
			return "https://gdata.youtube.com/feeds/api/users/default?access_token=" + this.get('token') + "&alt=json&v=2";
		},

		signin: function() {
			return this.signinUrl();
		},
			// require([this.authUrls.signin.call(this)], _.bind(this.onProfileChange, this));
		initialize: function() {
			this.on('change:author', this.onProfileChange, this);
			this.on('change:token', this.fetchProfile, this);
		},

		fetchProfile: function(){
			this.url = this.profile();
			this.fetch();
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
			return this.get('yt$username').$t || '';
		},

		getThumbnail: function() {
			return this.get('media$thumbnail').url;
		}
	});
   
    return YoutubeProfileService; 
});