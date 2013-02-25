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
		},
		
		updateState: function(model, isPlaying) {
			if (isPlaying) {
				this.collection.savePlayed(model);
			}
		}
	});

    return SearchResults;
});