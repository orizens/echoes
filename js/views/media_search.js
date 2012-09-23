define([
	'jquery',
	'underscore',
	'backbone'

], function($, _, Backbone) {
   
    var MediaSearch = Backbone.View.extend({
		el: '#media-explorer',
		
		events: {
			'click button' : 'onExplore'
		},

		initialize: function(){
			// cache input field
			this.$search = this.$el.find('input');
		},

		onExplore: function(ev) {
			ev.preventDefault();
			this.trigger('search-request', this.$el.find('input').val());
		},

		getQuery: function() {
			return this.$search.val();
		}
	});
   
    return MediaSearch; 
});