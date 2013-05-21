define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_item',
	'collections/youtube_search_results',
	'collectionView',
	'transition'
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
			this.listenTo(this.collection, 'reset update', this.render);
			this.listenTo(this.collection, 'change:isPlaying', this.updateState);
			// this.listenTo(this, 'before:render', this.hide);
			// this.listenTo(this, 'after:render', this.show);
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
		}

	});

	return youtubeVideos;
});