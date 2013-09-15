define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_item',
	'collections/youtube_search_results'
], function($, _, Backbone, YoutubeItemView, YoutubeSearchResultsList) {
	
	var youtubeVideos = Backbone.View.extend({

		tagName: 'ul',

		className: 'clearfix unstyled ux-maker youtube-items-container',
		
		view: {
			type: YoutubeItemView,
			collection: YoutubeSearchResultsList
		},

		transition: {
			duration: 200,
			css: 'transition-in'
		},

		initialize: function() {
			this.listenTo(this.model.youtube(), 'change:data', this.updateCollection);
			this.listenTo(this.collection, 'change:isPlaying', this.updateState);
			this.listenTo(this.collection, 'change:addToPlaylist', this.addToPlaylist);
			this.listenTo(this.collection, 'change:isFavorite', this.favoriteMedia);
			this.model.youtube().search();
		},

		updateCollection: function(model, data) {
			if (data) {
				this.collection.reset(data.items);
			}
		},
		
		updateState: function(model, isPlaying) {
			if (isPlaying) {
				this.collection.savePlayed(model);
			}
		},

		addToPlaylist: function(model, addToPlaylist){
			this.model.set('playlist-add', model.toJSON());
		},

		favoriteMedia: function(model, isFavorite){
			// this.model.set('mark-as-favorite', model);
			var favoriteId = this.model.youtube().profile.getFavoritesId();
			this.model.youtube().playlists.insert(favoriteId, model.id);
		}

	});

	return youtubeVideos;
});