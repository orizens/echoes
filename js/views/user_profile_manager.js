define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, backbone) {
   
	var UserProfileManager = Backbone.View.extend({

		el: '#user-profile',

		events: {
			'click .sign-out': 'signOut'
		},

		initialize: function() {
			this.listenTo(this.model.user(), 'change:author', this.renderUsername);
			this.renderUsername();
			this.renderSigninUrl();
		},

		renderUsername: function() {
			var user = this.model.user();
			if (user) {
				this.$('.icon-user').css('backgroundImage', 'url(' + user.getThumbnail() + ')');
				this.$('.username').html(user.getDisplayUsername());
				this.$el.addClass('user-signed-in');
			}
		},

		renderSigninUrl: function () {
			this.$('.sign-in').attr('href', this.model.user().signin());
		},

		connect: function(url) {
			window.open(
				url,
				"hybridauth_social_sing_on",
				"location=0,status=0,scrollbars=0,width=800,height=500"
			);
		},

		signOut: function(ev) {
			ev.preventDefault();
			window.location.reload();
		}

	});
   
	return UserProfileManager;
});