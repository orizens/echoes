var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbonejs');
var YoutubeUserPlaylistItemTemplate = require('../../templates/youtube_user_playlist_item.html');
   
var YoutubeUserPlaylistItem = Backbone.View.extend({
	tagName: 'li',
	
	className: 'user-playlist',

	template: YoutubeUserPlaylistItemTemplate,

	events: {
		'click a': 'onPlaylistSelected'
	},

	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		var model = {
			id: this.model.id,
			title: this.model.attributes.snippet.title,
			size: this.model.attributes.contentDetails.itemCount
		};
		this.$el.html(this.template(model));
		return this;
	},

	onPlaylistSelected: function(ev) {
		this.trigger('playlist-selected', this.model.toJSON());
		this.$el.addClass('active');
	}
});

module.exports = YoutubeUserPlaylistItem;