define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, backbone) {
   
	var UserProfileManager = Backbone.View.extend({

		el: '#user-profile',

		events: {
			'click .sign-in': 'signIn',
			'click .sign-out': 'signOut'
		},

		initialize: function() {
			this.model.user().on('change:author', this.renderUsername, this);
		},

		renderUsername: function(user) {
			this.$('.icon-user').css('backgroundImage', 'url(' + user.getThumbnail() + ')');
			this.$('.username').html(user.getUsername());
			this.$el.addClass('user-signed-in');
		},

		connect: function(url) {
			window.open(
				url,
				"hybridauth_social_sing_on",
				"location=0,status=0,scrollbars=0,width=800,height=500"
			);
		},

		signIn: function(ev) {
			ev.preventDefault();
			window.location.href = this.model.user().signin();
		},

		signOut: function(ev) {
			ev.preventDefault();
			window.location.reload();
		}

	});
   
	return UserProfileManager;
});