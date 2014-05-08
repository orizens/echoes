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
			collection: YoutubeSearchResultsList,
			events: {
				'play-media': 'playMedia'
			}
		},

		// transition: {
		// 	duration: 200,
		// 	css: 'transition-in'
		// },

		initialize: function() {
			this.listenTo(this.model.youtube, 'change:data', this.updateCollection);
			this.listenTo(this.model.youtube, 'change:query change:preset', this.reset);
			// this.listenTo(this.collection, 'change:isPlaying', this.updateState);
			this.listenTo(this.collection, 'change:isFavorite', this.favoriteMedia);
			this.listenTo(Backbone, 'app:load-more', this.handleLoadMore);
			this.$el.addClass('transition-out');
			this.model.youtube.set('feedType', 'videos');
			this.model.youtube.set({ startIndex: 1 }, { silent: true });
			this.model.youtube.fetch();
		},

		playMedia: function(model){
			this.model.playMedia({ 
				type: 'video',
				mediaId: model.id
			});
			this.updateState(model, true);
		},
		
		handleLoadMore: function(ev){
			this.model.youtube.fetchNext();
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

		favoriteMedia: function(model, isFavorite){
			// this.model.set('mark-as-favorite', model);
			var favoriteId = this.model.youtube.profile.getFavoritesId();
			this.model.youtube.playlists.insert(favoriteId, model.id);
		}

	});

	return youtubeVideos;
});
