var _ = require('underscore');
var Backbone = require('backbonejs');
   
var YoutubePlaylistItem = Backbone.Model.extend({
	defaults: {
		//- custom properties not related to json response
		isPlaying: false
	},

	getThumbnail: function(){
		var tmb = this.attributes.thumbnail;
		var url = tmb && tmb.hqDefault || '';
		return url;
	}
});
   
module.exports = YoutubePlaylistItem;