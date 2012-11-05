define([
	'underscore',
	'backbone',
	'./user_profile_manager',
	'safe'
], function(_, Backbone, UserProfileManager, safe) {

	var PlayerModel = Backbone.Model.extend({
		defaults: {
			// results layout state: video, playlist
			layout: 'video',
			filter: 'video',

			// handles the router navigation 'routes' object
			route: null,

			// properties for controling media playing
			mediaId: null,
			mediaOptions: null,
			
			// models
			user: new UserProfileManager()
		},

		// safe: 'EchoesPlayerApp',

		connectUser: function() {
			this.get('user').fetch();
		},

		getSignin: function() {
			return this.get('user').urls.signin;
		},

		getSignout: function() {
			return this.get('user').urls.signout;
		},

		/**
		 * sets the current visible screen presented to the user
		 * @param {string} screenId
		 */
		setRoute: function(screenId) {
			this.set('route', screenId);
		},

		getRoute: function(){
			return this.get('route');
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