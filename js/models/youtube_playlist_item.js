define([
	'underscore',
	'backbone',
	'utils'
], function(_, Backbone, Utils) {
   
    var YoutubePlaylistItem = Backbone.Model.extend({
		defaults: {
			//- custom properties not related to json response
		}
	});
   
    return YoutubePlaylistItem;
});