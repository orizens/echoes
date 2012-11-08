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
			this.searchModel = new MediaSearchModel();
			this.model.on('change:query', this.render, this);
			// cache input field
			this.$search = this.$el.find('input');
			this.$search.val(this.model.get('query'));
		},

		render: function() {
			var query = this.model.get('query');
			this.$search.val(query);
			this.searchModel.set({ query: query }, { silent: true });
			return this;
		},

		querySearch: function(ev) {
			ev.preventDefault();
			var query = this.$search.val();
			this.searchModel.set({ query: query }, { silent: true });
			this.model.set({ query: query });
		},

		getQuery: function() {
			return this.searchModel.get('query');
		},

		setQuery: function(query) {
			this.searchModel.set('query', query);
		}
	});
   
    return MediaSearch;
});