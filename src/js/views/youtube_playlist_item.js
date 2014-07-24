var Backbone = require('backbonejs');
var YoutubePlaylistItemTemplate = require('../../templates/youtube_playlist_item.html');
   
var YoutubePlaylistItem = Backbone.View.extend({
	tagName: 'li',
	
	className: 'well youtube-item youtube-playlist-item span3 nicer-ux ux-maker card',

	template: YoutubePlaylistItemTemplate,
	
	events: {
		'click .media-thumb': 'updateState'
	},

	initialize: function() {
		this.listenTo(this.model, 'change:isPlaying', this.render);
	},

	render: function() {
		var model = this.model.toJSON();
		model.thumbnail = this.model.getThumbnail();
		this.$el.html(this.template(model));
		return this;
	},

	updateState: function() {
		this.model.set('isPlaying', true);
	},

	destroy: function() {
		this.undelegateEvents();
		this.remove();
	}
});

module.exports = YoutubePlaylistItem;