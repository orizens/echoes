define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/youtube_playlist_list_item.html'
], function($, _, Backbone, template) {
	var PlaylistView = Backbone.View.extend({
		tagName: 'li',
		template: _.template(template),
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var PlaylistsList = Backbone.View.extend({

		events: {
			'click .modal-body a': function (ev) {
				ev.preventDefault();
				// this.addToPlaylist($(ev.target).data('id'));
			}
		},

		view: {
			type: PlaylistView
		},

		initialize: function() {
			// this.listenTo(this.model.user().playlists, 'reset', this.renderPlaylists);
			// this.listenTo(this.model.user().playlists, 'add', this.renderPlaylists);
			// this.listenTo(this.model.user().playlists, 'change', this.renderGapiResult);
		}

	});

	return PlaylistsList;
});