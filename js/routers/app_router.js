define([
	'jquery',
	'underscore',
	'backbone',
	'safe'
], function($, _, Backbone, s) {
   
    var AppRouter = Backbone.Router.extend({

		routes: {
			'': 'explore',
			'explore': 'explore',
			// 'history': 'history',

			'filter/:feedType': 'filter',
			'searches/:query': 'search',
			'play/:type/:mediaId': 'playMedia'
		},

		initialize: function(attributes) {
			this.model = attributes.model;
			Backbone.history.start();
		},

		explore: function() {
			this.model.route('explore');
			this.markNav('explore');
		},

		history: function() {
			// this.model.route('history');
			// this.markNav('history');
		},

		search: function(query) {
			this.model.set({ 'query': query }, { silent: true });
		},

		filter: function(feedType) {
			this.model.set('filter', feedType);
		},
		/**
		 * plays media url by type
		 * @param  {string} type    - supports: 'video', 'playlist'
		 * @param  {string} mediaId - supplied by system
		 */
		playMedia: function(type, mediaId) {
			this.model.playMedia(mediaId, { type: type });
		},

		// TODO: should be from a View
		markNav: function(route) {
			$("#library-nav").find('li').removeClass('active')
				.end()
				.find("a[href^='#" + route + "']").parent().addClass('active');
		}
	});
   
    return AppRouter;
});