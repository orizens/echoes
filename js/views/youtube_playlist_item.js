define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_playlist_item.html'
], function($, _, Backbone, YoutubePlaylistItemTemplate) {
   
    var YoutubePlaylistItem = Backbone.View.extend({
		tagName: 'li',
		
		className: 'well youtube-item youtube-playlist-item span3 nicer-ux ux-maker card',

		template: _.template(YoutubePlaylistItemTemplate),
		
		events: {
			'click .media-thumb': 'updateState'
		},

		initialize: function() {
			this.listenTo(this.model, 'change:isPlaying', this.render);
		},

		render: function() {
			this.$el.html( this.template(this.model.toJSON()) );
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
   
    return YoutubePlaylistItem;
});