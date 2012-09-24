define([
	'jquery',
	'underscore',
	'backbone',
	'models/youtube_item',
	'storage'
], function($, _, Backbone, YoutubeItemModel, storage) {
   
	var HistoryPlaylist = Backbone.Collection.extend({
		model: YoutubeItemModel,

		// localStorage: new Store("historyPlaylist"),

		// initialize: function() {
		// 	this.fetch();
		// },

		queue: function(youtubeJSON) {
			this.add(youtubeJSON);
		}
	});
   
	return HistoryPlaylist;
});