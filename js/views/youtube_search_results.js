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

		// transition: {
		// 	duration: 200,
		// 	css: 'transition-in'
		// },

		initialize: function() {
			this.listenTo(this.model.youtube(), 'change:data', this.updateCollection);
			this.listenTo(this.model.youtube(), 'change:query', this.reset);
			this.listenTo(this.collection, 'change:isPlaying', this.updateState);
			this.listenTo(this.collection, 'change:addToPlaylist', this.addToPlaylist);
			this.listenTo(this.collection, 'change:isFavorite', this.favoriteMedia);
			this.listenTo(Backbone, 'app:load-more', this.handleLoadMore);
			this.$el.addClass('transition-out');
			// this.model.youtube().search();
		},
		
		handleLoadMore: function(ev){
			this.model.youtube().fetchNext();
		},

		updateCollection: function(model, data) {
			if (data) {
				this.$el.hide();
				this.collection.add(data.items);
				this.$el.show().addClass('transition-in').removeClass('transition-out');
			}
		},
		
		reset: function () {
			this.collection.reset();
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