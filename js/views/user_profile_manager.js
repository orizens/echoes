define([
	'jquery',
	'underscore',
	'backbone',
	'modules/gsignin/gsignin'
], function($, _, backbone, gsignin) {
   
	var UserProfileManager = Backbone.View.extend({

		el: '#user-profile',

		events: {
			'click .sign-out': 'signOut',
			// 'click .sign-in': 'signIn'
		},

		initialize: function() {
			// this.listenTo(this.model.user, 'change:author', this.renderUsername);
			this.listenTo(this.model.youtube.profile, 'change:items', this.renderUsername);
			this.signinButton = new gsignin({
				el: this.$('.sign-in')[0],
				scopes: this.model.user.auth.scopes,
				clientId: this.model.user.getClientId()
			});
			this.listenTo(this.signinButton, 'auth:success', this.handleSignIn);
		},

		handleSignIn: function(authResult){
			// TODO - update app.user iwth token and load relevant
			// client api's in relevant services:
			// load youtube v3 api, load user profile (same ProfileService?)
			Backbone.trigger('user:authorized' ,authResult);
		},

		renderUsername: function() {
			var profile = this.model.youtube.profile;
			if (profile && profile.attributes.items) {
				this.$('.icon-user').css('backgroundImage', 'url(' + profile.picture('high') + ')');
				this.$('.username').html(profile.title());
				this.$el.addClass('user-signed-in');
			} else {
				this.$el.removeClass('user-signed-in').css('backgroundImage', '');
			}
		},

		signIn: function (ev) {
			// ev.preventDefault();
			// this.listenTo(this.model.user, 'change:')
			// this.model.user.signIn();
			if (window.gapi) {
				gapi.auth.authorize({
					client_id: this.model.user.getClientId(),
					scope: this.model.user.auth.scopes,
					// false - is for showing pop up
					immediate: false, 
				}, function (authResult) {
					debugger;
				});
			}
			// this.model.youtube.profile.fetch();
		},

		signOut: function(ev) {
			ev.preventDefault();
			this.model.user.clear();
			this.model.user.signOut();
			// this.model.youtube.profile.clear();
		}

	});
   
	return UserProfileManager;
});