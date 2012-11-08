define([
	'underscore',
	'backbone',
	'models/youtube_playlist_item'
], function(_, Backbone, YoutubePlaylistItemModel) {
   
    var YoutubePlaylistSearchResults = Backbone.Collection.extend({
		model: YoutubePlaylistItemModel
	});
   
    return YoutubePlaylistSearchResults; 
});