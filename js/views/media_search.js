define([
	'jquery',
	'underscore',
	'backbone',
	'models/media_search'
], function($, _, Backbone, MediaSearchModel) {
   
    var MediaSearch = Backbone.View.extend({
		el: '#media-explorer',
		
		events: {
			'click button' : 'onExplore'
		},

		initialize: function(){
			this.model = new MediaSearchModel();
			this.model.on('change:query', this.publishSearch, this);
			// cache input field
			this.$search = this.$el.find('input');
			this.$search.val(this.model.get('query'));
			// this.model.fetch();
		},

		onExplore: function(ev) {
			ev.preventDefault();
			this.model.save('query', this.$search.val());
		},

		publishSearch: function() {
			this.trigger('search-request', this.model.get('query'));
		},

		getQuery: function() {
			return this.model.get('query');
		}
	});
   
    return MediaSearch;
});