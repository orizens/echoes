define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
    var YoutubePlaylistItem = Backbone.Model.extend({
		defaults: {
			//- custom properties not related to json response
			isPlaying: false
		}
	});
   
    return YoutubePlaylistItem;
});