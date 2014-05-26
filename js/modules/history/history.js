define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_item',
	'./history-playlist'
], function($, _, Backbone, YoutubeItemView, HistoryPlaylist) {

	var history = Backbone.View.extend({

		tagName: 'ul',

		className: 'clearfix unstyled ux-maker youtube-items-container',
		
		view: {
			type: YoutubeItemView,
			collection: HistoryPlaylist,
			events: {
				'play-media': 'playMedia'
			}
		},

		// transition: {
		// 	duration: 200,
		// 	css: 'transition-in'
		// },

		initialize: function() {
			this.listenTo(Backbone, 'gapiload:youtube', function(){
				this.model.youtube.history.fetch();
			});

			this.listenTo(this.model.youtube.profile, 'loaded', function(){
				this.model.youtube.history.fetch();
			});
			// this.listenTo(this.model.youtube.history, 'load:client', function(){
				// this.model.youtube.history.fetch();
			// });
			this.listenTo(this.model.youtube.history, 'change:items', this.updateCollection);

			// this.listenTo(this.model.youtube, 'change:data', this.updateCollection);
			// this.listenTo(this.model.youtube, 'change:query change:preset change:duration', this.reset);
			// this.listenTo(this.collection, 'change:isPlaying', this.updateState);
			// this.listenTo(this.collection, 'change:isFavorite', this.favoriteMedia);
			this.listenTo(Backbone, 'app:load-more', this.handleLoadMore);
			this.$el.addClass('transition-out');
			// this.model.youtube.set('feedType', 'videos');
			// this.model.youtube.set({ startIndex: 1 });
			// this.model.youtube.fetch();
			this.render();
			this.model.youtube.history.connect();
			// if id wasn't set to the history by the media provider
			// need to connect to the profile and set it
			if (!this.model.youtube.history.hasId()){
				this.model.youtube.profile.connect();
			}

		},

		playMedia: function(model){
			this.model.playMedia({ 
				type: 'video',
				mediaId: model.id
			});
			this.updateState(model, true);
		},
		
		handleLoadMore: function(ev){
			// this.model.youtube.fetchNext();
		},

		updateCollection: function(model, items) {
			if (items) {
				this.$el.hide();
				this.collection.add(items);
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

	return history;
});
