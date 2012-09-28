define([
	'jquery',
	'underscore',
	'backbone',
	'models/youtube_item',
	'utils',
	'safe'
], function($, _, Backbone, YoutubeItemModel, Utils, safe) {
   
	var HistoryPlaylist = Backbone.Collection.extend({
		model: YoutubeItemModel,

		// localStorage: new Store("historyPlaylist"),

		initialize: function() {
			// this.storage = new Utils.Safe('historyPlaylist', this);
			Backbone.Safe.create('historyPlaylist', this);
		},

		queue: function(youtubeJSON) {
			this.add(youtubeJSON);
		}
	});
   
	return HistoryPlaylist;
});