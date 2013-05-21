define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_playlist_item',
	'collections/youtube_playlists_results',
	'collectionView',
	'transition'
], function($, _, Backbone, YoutubePlaylistItemView, YoutubePlaylistsResults) {
	
	var SearchResults = Backbone.View.extend({
		tagName: 'ul',

		className: 'clearfix unstyled ux-maker playlists-result',
		
		view: {
			type: YoutubePlaylistItemView,
			collection: YoutubePlaylistsResults
		},

		transition: {
			duration: 200,
			css: 'transition-in'
		},

		initialize: function() {
			this.listenTo(this.model.youtube(), 'change:data', this.updateCollection);
			this.listenTo(this.collection, 'change:isPlaying', this.updateState);
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