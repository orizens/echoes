define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_item',
	'collections/youtube_search_results',
	'collectionView'
], function($, _, Backbone, YoutubeItemView, YoutubeSearchResultsList, CollectionView) {
	
	var SearchResults = CollectionView.extend({
		tagName: 'ul',

		className: 'clearfix unstyled',
		
		collection: YoutubeSearchResultsList,

		view: YoutubeItemView,

		initialize: function() {
			this.listenTo(this.collection, 'change:isPlaying', this.updateState);
			this.listenTo(this.collection, 'change:addToPlaylist', this.addToPlaylist);
			this.listenTo(this.collection, 'change:isFavorite', this.favoriteMedia);
		},
		
		updateState: function(model, isPlaying) {
			if (isPlaying) {
				this.collection.savePlayed(model);
			}
		},

		addToPlaylist: function(model, addToPlaylist){
			this.trigger('add-to-playlist', model);
		},

		favoriteMedia: function(model, isFavorite){
			this.trigger('mark-as-favorite', model);
		}
	});

    return SearchResults;
});