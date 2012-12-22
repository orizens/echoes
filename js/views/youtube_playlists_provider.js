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
			this.model.user().on('change:author', this.onUserChange, this);
		},

		onUserChange: function(user) {
			this.collection.username = user.getUsername();
			this.collection.fetch();
		},

		onPlaylistSelected: function() {
			this.$el.find('.active').removeClass('active');
		}
	});

    return YoutubePlaylistsView;
});