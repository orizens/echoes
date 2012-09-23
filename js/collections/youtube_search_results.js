define([
	'underscore',
	'backbone',
	'models/youtube_item'
], function(_, Backbone, YoutubeItemModel) {
   
    var YoutubeSearchResults = Backbone.Collection.extend({
		model: YoutubeItemModel
	});
   
    return YoutubeSearchResults; 
});