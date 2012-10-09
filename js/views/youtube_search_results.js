define([
	'jquery',
	'underscore',
	'backbone',
	'views/youtube_item',
	'collections/youtube_search_results'
], function($, _, Backbone, YoutubeItemView, YoutubeSearchResultsList) {
   
    var YoutubeSearchResultsView = Backbone.View.extend({
		el: "#searchResults",

		initialize: function() {
			this.collection = new YoutubeSearchResultsList();
			this.collection.on('reset', this.render, this);
			this.views = [];
		},

		render: function() {
			this.$el.fadeOut(300, _.bind(this.renderCollection, this));
			// this.$el.animate({
			// 	opacity: 'hide'},
			// 	duration: 300, 'linear',
			// 	_.bind(this.renderCollection, this)
			// );
			// this.renderCollection();
		},

		renderCollection: function() {
			this.resetViews();
			//- TODO: fix-  in order the remove the progress bar
			this.$el.empty();
			this.collection.each(function(item){
				this.views.push(new YoutubeItemView({ model: item }));
				this.views[this.views.length - 1].on('media-clicked', this.onSelected, this);
				this.$el.append( this.views[this.views.length - 1].render().el );
			}, this);
			this.$el.delay(200).fadeIn(500);
		},

		resetViews: function() {
			_.each(this.views, function(view) {
				view.off();
				view.destroy();
			});
			this.views = [];
		},

		update: function(items) {
			this.collection.reset(items);
		},

		onSelected: function(ev) {
			this.trigger('search-result-selected', ev);
		}
	});
   
    return YoutubeSearchResultsView; 
});