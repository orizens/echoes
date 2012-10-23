define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
   
    var YoutubeSearchResultsView = Backbone.View.extend({
		el: "#feed-filter",

		events: {
			'click .btn': 'onFeedTypeSelect'
		},

		initialize: function() {
			this.model = {
				feedType: 'videos'
			};
		},

		onFeedTypeSelect: function(ev) {
			var $button = $(ev.currentTarget);
			this.$el.find('.btn').removeClass('active');
			$button.addClass('active');
			this.model.feedType = $button.data('feed');
			this.trigger('feed-type-change', this.model);
		}
	});
   
    return YoutubeSearchResultsView; 
});