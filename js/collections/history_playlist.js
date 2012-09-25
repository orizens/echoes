define([
	'jquery',
	'underscore',
	'backbone',
	'models/youtube_item',
	'utils'
], function($, _, Backbone, YoutubeItemModel, Utils) {
   
	var HistoryPlaylist = Backbone.Collection.extend({
		model: YoutubeItemModel,

		// localStorage: new Store("historyPlaylist"),

		initialize: function() {
			this.storage = new Utils.Safe('historyPlaylist', this);
		},

		queue: function(youtubeJSON) {
			this.add(youtubeJSON);
		}
	});
   
	return HistoryPlaylist;
});