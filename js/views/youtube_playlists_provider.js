define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_user_playlist_item',
	'collections/youtube_playlists_provider',
	'collectionView'
], function($, _, Backbone, YoutubeItemView, YoutubePlaylistsProvider) {
	var YoutubePlaylistsView = Backbone.View.extend({

		el: '#user-playlists',

		view: {
			type: YoutubeItemView,
			collection: YoutubePlaylistsProvider,
			events: {
				'playlist-selected': 'onPlaylistSelected'
			}
		},

		initialize: function() {
			this.listenTo(this.model.user(), 'change:author', this.onUserChange);
			this.listenTo(this.collection, 'reset', this.updateApp);
			this.onUserChange();
		},

		onUserChange: function() {
			var user = this.model.user();
			if (user && user.getUsername()) {
				this.collection.username = user.getUsername();
				this.collection.fetch({ reset: true });
			}
		},

		onPlaylistSelected: function() {
			this.$el.find('.active').removeClass('active');
		},

		updateApp: function(collection){
			this.model.user().playlists(collection.toJSON());
		}
	});

    return YoutubePlaylistsView;
});