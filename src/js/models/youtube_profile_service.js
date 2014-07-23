var _ = require('underscore');
var Backbone = require('backbonejs');
var vars = require('vars');
var YoutubePlaylistsProvider = require('../collections/youtube_playlists_provider.js');
var ProfileService = require('./youtube/ProfileService.js');
var GPlusAuth = require('../models/youtube/gplusAuth.js');
   
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
   
module.exports = YoutubeUserProfileService; 