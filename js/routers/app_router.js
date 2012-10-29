define([
	'jquery',
	'underscore',
	'backbone',
	'views/player_app',
	'models/player_app',
	'safe'
], function($, _, Backbone, PlayerApp, PlayerModel, s) {
   
    var AppRouter = Backbone.Router.extend({

		routes: {
			'': 'showExplore',
			'explore': 'showExplore',
			'history': 'showHistory',

			'searches/:feedType/:query': 'search',
			'play/:type/:mediaId': 'playMedia'
		},

		initialize: function() {
			this.appModel = new PlayerModel();
			this.appView = new PlayerApp({ model: this.appModel });
		},

		showExplore: function() {
			this.appModel.setRoute('explore');
			this.markNav('explore');
		},

		showHistory: function() {
			this.appModel.setRoute('history');
			this.markNav('history');
		},

		search: function(feedType, query) {
			this.appView.query(query);
		},

		/**
		 * plays media url by type
		 * @param  {string} type    - supports: 'video', 'playlist'
		 * @param  {string} mediaId - supplied by system
		 */
		playMedia: function(type, mediaId) {
			this.appView.query(false, {ignore: true});
			this.appModel.playMedia(mediaId, { type: type });
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