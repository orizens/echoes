define([
	'underscore',
	'backbone',
	'vars',
	'collections/youtube_playlists_provider',
	'./youtube/ProfileService',
	'models/youtube/gplusAuth'
], function(_, Backbone, vars, YoutubePlaylistsProvider, ProfileService, GPlusAuth) {
   
    var YoutubeUserProfileService = Backbone.Model.extend({
		playlists: new YoutubePlaylistsProvider(),
		auth: new GPlusAuth(),

		parse: function(response){
			if (response) {
				this.set(response.entry);
			}
		},

		getClientId: function(){
			return this.auth.clientId();
		}
	});
   
    return YoutubeUserProfileService; 
});