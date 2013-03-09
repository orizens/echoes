define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_playlist_item',
	'collections/youtube_playlists_results',
	'collectionView'
], function($, _, Backbone, YoutubePlaylistItemView, YoutubePlaylistsResults, CollectionView) {
	
	var SearchResults = CollectionView.extend({
		tagName: 'ul',

		className: 'clearfix unstyled playlists-result',
		
		collection: YoutubePlaylistsResults,
		
		view: YoutubePlaylistItemView,

		initialize: function() {
			this.listenTo(this.collection, 'change:isPlaying', this.updateState);
		},

		onSelected: function(ev) {
			this.trigger('search-result-selected', ev);
		},

		updateState: function(model, isPlaying) {
			if (isPlaying) {
				this.collection.savePlayed(model);
			}
		}
	});

    return SearchResults;
});