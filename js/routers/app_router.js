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
			'access_token=:token&token_type=:tokenType&expires_in=:expires': 'connect',

			'filter/:feedType': 'filter',
			'searches/:query': 'search',
			'play/:type/:mediaId': 'playMedia',
			'play/playlist/:playlistId/:index': 'playPlaylistItem'
		},

		initialize: function(attributes) {
			this.model = attributes.model;
			this.model.on('change:currentIndex', this.updatePlaylistUrl, this);
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

		connect: function(token, tokenType, expires) {
			this.model.connect(token);
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

		playPlaylistItem: function(playlistId, index) {
			this.model.playMedia(playlistId, { 
				type: 'playlist',
				playlistId: playlistId,
				index: index
			});
		},

		updatePlaylistUrl: function(model, index) {
			var playlistId = this.model.get('play') || '';
			if (_.isNumber(index)) {
				this.navigate('play/playlist/' + playlistId + '/' + index, { trigger: false });
			}
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