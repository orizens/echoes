define([
	'underscore',
	'backbone',
	'./user_profile_manager',
	'./youtube_media_provider',
	'safe'
], function(_, Backbone, 
	UserProfileManager, YoutubeMediaProvider, safe) {

	var PlayerModel = Backbone.Model.extend({
		defaults: {
			query: '',
			// results layout state: video, playlist
			layout: 'video',
			filter: 'video',

			// handles the router navigation 'routes' object
			route: null,

			// properties for controling media playing
			play: null,
			mediaId: null,
			mediaOptions: null,
			
			// models
			user: null,
			youtube: null
		},

		safe: 'EchoesPlayerApp',

		initialize: function() {
			// initialize models
			this.set('user', new UserProfileManager());
			this.set('youtube', new YoutubeMediaProvider());

			// reset attributes that don't need cache
			this.set('play', null);

			// register to app events
			this.on('change:route', this.onRouteChange);
			this.on('change:filter', this.onFilterChange);
			this.on('change:query', this.onQueryChange);

			this.youtube().set('feedType', this.get('filter'));
			this.youtube().query({ query: this.get('query') });
		},
		
		/* handlers */
		onRouteChange: function(model, route) {
			var query = this.get('query');
			this.trigger('change:query', query);
		},
		
		onFilterChange: function(model, filter) {
			this.youtube().set('feedType', filter);
		},

		onQueryChange: function(model, query) {
			this.youtube().query({ query: query });
		},
		/* convinience methods for retrieving models */
		//  user profile manager
		user: function() { 
			return this.get('user');
		},

		connectUser: function() {
			this.user().fetch();
		},

		getSignin: function() {
			return this.user().urls.signin;
		},

		getSignout: function() {
			return this.user().urls.signout;
		},
		
		//  youtube media provider
		youtube: function() {
			return this.get('youtube');
		},

		/**
		 * sets the current visible screen presented to the user
		 * @param {string} screenId
		 */
		route: function(screenId) {
			if (screenId) {
				this.set('route', screenId);
			} else {
				return this.get('route');
			}
		},

		getMediaData: function() {
			return {
				media: this.get('mediaId'),
				options: this.get('mediaOptions')
			};
		},

		getOptions: function() {
			return this.get('mediaOptions');
		},
		
		playMedia: function(mediaId, options) {
			this.set('mediaOptions', options);
			this.set('mediaId', mediaId);
			this.set('play', mediaId);
		}
		
	});

	return PlayerModel;
});