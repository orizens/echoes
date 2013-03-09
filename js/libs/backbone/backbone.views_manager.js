define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_search_results',
	'views/youtube_playlists_results'
], function($, _, Backbone, YoutubeSearchResults, YoutubePlaylistsResults, CollectionView) {
	
	var ViewsManager = Backbone.ViewsManager.extend({

		layout: {
			videos: YoutubeSearchResults,
			playlists: YoutubePlaylistsResults
		},

		currentLayout: 'videos',

		// reference to the current view instance
		currentView: null,

		initialize: function() {
			this.model.on('change:filter', this.onLayoutChange, this);
		},

		onLayoutChange: function(model, layout) {
			if (this.layout[layout]) {
				this.disableView(this.layout[this.currentLayout]);
				this.enableView(this.layout[layout]);
				this.currentLayout = layout;
			}
		},

		enableView: function(view) {
			view.delegateEvents();
			view.$el.show();
		},

		disableView: function(view) {
			view.undelegateEvents();
			view.$el.hide();
		},

		render: function() {
			this.renderCurrentLayout();
			return this;
		},

		renderCurrentLayout: function() {
			if (!this.layout[this.currentLayout].el) {
				this.createView();
				this.$el.append( this.currentView.render().el );
			}
		},

		createView: function() {
			this.layout[this.currentLayout] = new this.layout[this.currentLayout]({ model: this.model });
			this.currentView = this.layout[this.currentLayout];
		},

		update: function(items) {
			this.layout[this.currentLayout].update(items);
		}
	});

	return ViewsManager;
});