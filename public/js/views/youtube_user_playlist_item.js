define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_user_playlist_item.html'
], function($, _, Backbone, YoutubeUserPlaylistItemTemplate) {
   
    var YoutubeUserPlaylistItem = Backbone.View.extend({
		tagName: 'li',
		
		className: 'user-playlist',

		template: _.template(YoutubeUserPlaylistItemTemplate),

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
   
    return YoutubeUserPlaylistItem;
});