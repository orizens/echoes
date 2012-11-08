define([
	'underscore',
	'backbone',
	'utils'
], function(_, Backbone, Utils) {
   
    var YoutubeUserPlaylistItem = Backbone.Model.extend({
		defaults: {
			//- custom properties not related to json response
		}
	});
   
    return YoutubeUserPlaylistItem;
});