define([
	'jquery',
	'underscore',
	'backbone',
	'models/media_search'
], function($, _, Backbone, MediaSearchModel) {
   
    var MediaSearch = Backbone.View.extend({
		el: '#media-explorer',
		
		events: {
			'submit': 'querySearch'
		},

		initialize: function(){
			this.model = new MediaSearchModel();
			this.model.on('change:query', this.render, this);
			// cache input field
			this.$search = this.$el.find('input');
			this.$search.val(this.model.get('query'));
		},

		render: function() {
			this.$search.val(this.model.get('query'));
			return this;
		},

		querySearch: function(ev) {
			ev.preventDefault();
			var query = this.$search.val();
			this.model.set({ query: query }, { silent: true });
			this.trigger('search-request', query);
		},

		getQuery: function() {
			return this.model.get('query');
		},

		setQuery: function(query) {
			this.model.set('query', query);
		}
	});
   
    return MediaSearch;
});