var _ = require('underscore');
var Backbone = require('backbonejs');
var YoutubePlaylistItemView = require('../../views/youtube/playlist-resource-view.js');
var YoutubePlaylistsResults = require('../../collections/youtube_playlists_results.js');
	
var playlists = Backbone.View.extend({
	tagName: 'ul',

	className: 'clearfix unstyled ux-maker playlists-result',
	
	view: {
		type: YoutubePlaylistItemView,
		collection: YoutubePlaylistsResults
	},

	transition: {
		duration: 200,
		css: 'transition-in'
	},

	initialize: function() {
		this.listenTo(this.model.youtube.profile, 'change:items', this.list);
		// this.listenTo(this.model.youtube.playlists, 'update', function () {
		// 	this.$el.hide();
		// 	this.collection.add(this.model.youtube.playlists.toJSON());
		// 	this.$el.show().addClass('transition-in').removeClass('transition-out');
		// });
		this.render();
	},
	
	list: function(){
		if (this.model.youtube.profile.attributes.items) {
			this.model.youtube.playlists.list();
		} else {
			this.collection.reset([]);
		}
	},

	reset: function () {
		this.collection.reset();
	},

	updateCollection: function(model, data) {
		if (data) {
			this.$el.hide();
			this.collection.add(data.items);
			this.$el.show().addClass('transition-in').removeClass('transition-out');
			// this.collection.reset(data.items);
		}
	},

	updateState: function(model, isPlaying) {
		if (isPlaying) {
			this.collection.savePlayed(model);
		}
	}
});

module.exports = playlists;