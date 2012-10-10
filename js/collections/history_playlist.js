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

		safe: 'historyPlaylist',

		queue: function(youtubeJSON) {
			this.add(youtubeJSON);
		}
	});
   
	return HistoryPlaylist;
});