var _ = require('underscore');
var Backbone = require('backbonejs');
var YoutubePlaylistItemModel = require('../models/youtube_playlist_item.js');

var YoutubePlaylistSearchResults = Backbone.Collection.extend({
	model: YoutubePlaylistItemModel,

	played: null,

	initialize: function() {
		this.listenTo(this, 'reset', this.updatePlayedId);
	},

	savePlayed: function(model) {
		var playedModel;
		if (this.played === model.id) {
			return;
		}
		playedModel = this.get(this.played);
		if (playedModel) {
			playedModel.set({ 'isPlaying': false });
		}
		this.played = model.id;
	},

	updatePlayedId: function() {
		var current = this.get(this.played);
		if (current) {
			current.set({ 'isPlaying': true });
		}
	}
});

module.exports = YoutubePlaylistSearchResults;