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
			// this.listenTo(this.collection, 'change:isPlaying', this.updateState);
			this.listenTo(this.model.youtube(), 'change:data', this.updateCollection);
			// this.updateCollection(this.model.youtube(), this.model.youtube().get('data'));
			// this.on('after:render', ÷)
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
		}
	});

    return SearchResults;
});