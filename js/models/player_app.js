define([
	'underscore',
	'backbone',
	'./user_profile_manager',
	'./youtube_media_provider',
	'./youtube_profile_service',
	'./youtube_player',
	'./youtube/ProfileService'
], function(_, Backbone, 
	UserProfileManager, YoutubeMediaProvider, YoutubeProfileService, 
	YoutubePlayer, ProfileService
	) {
	// window.gprofile = new ProfileService();
	var PlayerModel = Backbone.Model.extend({
		defaults: {
			// results layout state: videos, playlists
			layout: 'videos',
			filter: 'videos',

			// handles the router navigation 'routes' object
			route: null,
			
			// models
			user: null,
			youtube: null,
			player: null,

			// actions
			"mark-as-favorite": false
		},

		safe: 'EchoesPlayerApp-v20131203',

		initialize: function() {
			// initialize models
			this.clean();
			// this.set('user', new UserProfileManager());
			this.set('youtube', new YoutubeMediaProvider());
			this.set('user', new YoutubeProfileService());
			this.set('player', new YoutubePlayer());

			// reset attributes that don't need cache
			this.set('route', null);
			this.set('playlist-add', false);
			// register to app events
			// this.on('change:route', this.onRouteChange);
			// this.on('change:filter', this.onFilterChange);

			this.youtube().set({'feedType': this.get('filter')}, { silent: true });
		},

		clean: function() {
			localStorage.removeItem('EchoesPlayerApp-v20130202');
		},
		
		start: function () {
			
			
		},
		/* handlers */
		onFilterChange: function(model, filter) {
			this.set({ layout: filter });
			// this.youtube().set('feedType', filter);
		},

		/* convinience methods for retrieving models */
		//  user profile manager
		user: function() {
			return this.get('user');
		},

		connectUser: function() {
			this.user().fetch();
		},

		connect: function(token) {
			this.user().setToken(token);
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
		route: function(route) {
			this.set({ layout: route });
			// this.set({ filter: route });
		},
		
		playMedia: function(options) {
			this.get('player').setOptions(options);
		},

		fetchCurrentMediaInfo: function() {
			this.youtube().fetchMediaById(this.get('player').get('mediaId'));
		},

		fetchPlaylistInfo: function(items) {
			// @todo should be a playlistId and a videoId seperated
			this.youtube().fetchPlaylistInfo(this.get('player').get('nowPlayingId'));
		}
	});

	return PlayerModel;
});