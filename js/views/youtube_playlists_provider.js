define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_user_playlist_item',
	'collections/youtube_playlists_provider',
	'collectionView'
], function($, _, Backbone, YoutubeItemView, YoutubePlaylistsProvider, CollectionView) {
	
	var YoutubePlaylistsView = CollectionView.extend({

		el: '#user-playlists',

		collection: YoutubePlaylistsProvider,

		view: YoutubeItemView,

		broadcasts: {
			'playlist-selected': 'onPlaylistSelected'
		},

		initialize: function() {
			this.listenTo(this.model.user(), 'change:author', this.onUserChange);
			this.onUserChange();
		},

		onUserChange: function() {
			var user = this.model.user();
			if (user) {
				this.collection.username = user.getUsername();
				this.collection.fetch();
			}
		},

		onPlaylistSelected: function() {
			this.$el.find('.active').removeClass('active');
		}
	});

    return YoutubePlaylistsView;
});