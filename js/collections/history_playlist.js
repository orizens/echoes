define([
	'jquery',
	'underscore',
	'backbone',
	'models/youtube_item'
], function($, _, Backbone, YoutubeItemModel) {
   
    var HistoryPlaylist = Backbone.Collection.extend({
    	model: YoutubeItemModel,

    	queue: function(youtubeJSON) {
    		this.add(youtubeJSON);
    	}
    });
   
    return HistoryPlaylist; 
});