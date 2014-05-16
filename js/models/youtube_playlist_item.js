define([
	'underscore',
	'backbone'
], function(_, Backbone) {
   
    var YoutubePlaylistItem = Backbone.Model.extend({
		defaults: {
			//- custom properties not related to json response
			isPlaying: false,
			thumbnail: {
				sqDefault: "http://placehold.it/480x360",
				hqDefault: "img/texture.png"
			}
		}
	});
   
    return YoutubePlaylistItem;
});