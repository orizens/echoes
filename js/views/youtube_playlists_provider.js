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