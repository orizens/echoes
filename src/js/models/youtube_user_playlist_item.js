var _ = require('underscore');
var Backbone = require('backbonejs');
   
var YoutubeUserPlaylistItem = Backbone.Model.extend({
	defaults: {
		//- custom properties not related to json response
	}
});
   
module.exports = YoutubeUserPlaylistItem;