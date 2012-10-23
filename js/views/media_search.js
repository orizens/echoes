define([
	'jquery',
	'underscore',
	'backbone',
	'models/media_search'
], function($, _, Backbone, MediaSearchModel) {
   
    var MediaSearch = Backbone.View.extend({
		el: '#media-explorer',
		
		events: {
			'click button' : 'querySearch',
			'submit': 'querySearch'
		},

		initialize: function(){
			this.model = new MediaSearchModel();
			this.model.on('change:query', this.publishSearch, this);
			// cache input field
			this.$search = this.$el.find('input');
			this.$search.val(this.model.get('query'));
		},

		querySearch: function(ev) {
			ev.preventDefault();
			this.model.set('query', this.$search.val());
		},

		publishSearch: function() {
			this.trigger('search-request', this.model.toJSON());
		},

		getQuery: function() {
			return this.model.get('query');
		}
	});
   
    return MediaSearch;
});