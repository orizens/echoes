define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
    var UserProfileModel = Backbone.Model.extend({
		url: 'http://orizens.com/tools/services/echoes/profile.php',

		urls: {
			signin: "http://orizens.com/tools/services/examples/widget_authentication/widget/?",
			signout: "http://orizens.com/tools/services/examples/widget_authentication/mywebsite/index.php?"
		},

		fetch: function() {
			require([this.url], _.bind(this.onProfileChange, this));
		},

		onProfileChange: function(response){
			if (window.ytProfile) {
				this.set(window.ytProfile.entry);
			}
		},

		getUsername: function() {
			return this.get('yt$username').$t || '';
		},

		getThumbnail: function() {
			return this.get('media$thumbnail').url;
		}
	});
   
    return UserProfileModel; 
});