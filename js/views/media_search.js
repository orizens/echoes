define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
   
    var MediaSearch = Backbone.View.extend({
		el: '#media-explorer',
		
		events: {
			'submit': 'querySearch'
		},

		initialize: function(){
			this.model.on('change:query', this.render, this);
			// cache input field
			this.$search = this.$el.find('input');
			this.render(this.model);
		},

		render: function(model, query) {
			query = query || this.model.get('query');
			this.$search.val(query);
			return this;
		},

		querySearch: function(ev) {
			ev.preventDefault();
			this.model.set({ query: this.$search.val() });
		}
	});
   
    return MediaSearch;
});