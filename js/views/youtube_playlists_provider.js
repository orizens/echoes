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
			this.model.user().on('change', this.onUserChange, this);
		},

		onUserChange: function(user) {
			this.collection.username = user.getUsername();
			this.collection.fetch();
		},

		renderCollection: function() {
			this.resetViews();
			this.collection.each(function(item){
				var index = this.views.length;
				this.views.push(new this.view({ model: item }));
				this.delegateBroadcasts(this.views[index]);
				this.$el.append( this.views[index].render().el );
			}, this);
		},

		onPlaylistSelected: function() {
			this.$el.find('.active').removeClass('active');
		}
	});

    return YoutubePlaylistsView;
});