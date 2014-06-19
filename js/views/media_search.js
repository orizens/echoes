define([
	'jquery',
	'jqueryui',
	'underscore',
	'backbone'
], function($, $ui, _, Backbone) {
   
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
			this.activateAutoComplete();
		},

		render: function(model, query) {
			query = query || this.model.get('query');
			this.$search.val(query);
			return this;
		},

		querySearch: function(ev) {
			ev.preventDefault();
			this.model.set({ query: this.$search.val() });
			this.$search.autocomplete( "close" );
		},

		//  todo - convert it to a Backbone.Model
		activateAutoComplete: function() {
			this.$search.autocomplete({
				source: function( request, response ) {
					$.ajax({
						url: "http://suggestqueries.google.com/complete/search",
						dataType: "jsonp",
						data: {
							hl: "en",
							ds: "yt",
							oi: "spell",
							spell: "1",
							json: "t",
							client: "youtube",
							q: request.term
						},
						success: function( data ) {
							response( data[1] );
						}
					});
				},
				minLength: 2,
				select: _.bind(function( event, ui ) {
					var term = ui.item ? ui.item.value : false;
					if (term) {
						this.model.set({ query: term });
						this.$search.autocomplete( "close" );
					}
				}, this)
			});
		}
	});
   
	return MediaSearch;
});