define([
	'underscore',
	'backbone',
], function(_, Backbone) {
   
    var YoutubeUserPlaylistItem = Backbone.Model.extend({
		defaults: {
			//- custom properties not related to json response
		}
	});
   
    return YoutubeUserPlaylistItem;
});