define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_search_results',
	'views/youtube_playlists_results'
], function($, _, Backbone, YoutubeSearchResults, YoutubePlaylistsResults, CollectionView) {
	
	var ContentLayout = Backbone.View.extend({
		el: '#search-results',

		layout: {
			videos: YoutubeSearchResults,
			playlists: YoutubePlaylistsResults
		},

		currentLayout: 'videos',

		initialize: function() {
			this.currentLayout = this.model.get('filter');
			// this.model.on('change:filter', this.onLayoutChange, this);
			this.model.youtube().on('new-media-response', this.update, this);
			_.each(this.layout, function(view, id, list){
				list[id] = new view();
				this.$el.append( list[id].render().$el.hide() );
			}, this);

			// TODO - should remove on first collection reset
			this.$el.find('.well').remove();
		},

		onLayoutChange: function(model, layout) {
			if (this.layout[layout]) {
				this.disableView(this.layout[this.currentLayout], this.enableView);
				// this.enableView(this.layout[layout]);
				this.currentLayout = layout;
			}
		},

		enableView: function() {
			this.layout[this.currentLayout].delegateEvents();
			this.layout[this.currentLayout].$el.fadeIn(200);
		},

		disableView: function(view, callback) {
			view.undelegateEvents();
			view.$el.fadeOut(200, _.bind(callback, this));
		},

		render: function() {
			// this.$el.fadeOut(200, _.bind(this.renderCollection, this));
			return this;
		},

		onSelected: function(ev) {
			this.trigger('search-result-selected', ev);
		},

		update: function(items) {
			items = _.isArray(items) ? items : items.items;
			this.disableView(this.layout[this.currentLayout], function(){
				this.currentLayout = this.model.get('filter');
				this.layout[this.currentLayout].update(items);
				this.enableView();
			});
		}
	});

	return ContentLayout;
});