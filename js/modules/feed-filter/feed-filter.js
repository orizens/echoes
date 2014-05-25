define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
   
    var YoutubeSearchResultsView = Backbone.View.extend({
		el: "#feed-filter",

		events: {
			'click li': 'onFeedTypeSelect'
		},

		initialize: function() {
			this.model.on('change:filter', this.onFilterChange, this);
			this.makeActive(this.$('.' + this.model.get('filter')));
		},

		onFilterChange: function(model, filter) {
			this.makeActive(this.$('.' + filter));
		},

		onFeedTypeSelect: function(ev) {
			var $button = $(ev.currentTarget);
			this.resetActive();
			this.makeActive($button);
		},

		resetActive: function() {
			this.$el.find('.active').removeClass('active');
			
		},

		makeActive: function($el) {
			$el.addClass('active');
		}
	});
   
    return {
    	create: function(model){
    		return new YoutubeSearchResultsView({
    			model: model
    		});
    	}
    }; 
});