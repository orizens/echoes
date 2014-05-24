define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
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
   
    return YoutubePlaylistItem;
});