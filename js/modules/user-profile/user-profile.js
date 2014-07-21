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
			'click .action': function (ev) {
				ev.preventDefault();
				this.model.updates.check();
			}
			// 'click .sign-in': 'signIn'
		},

		initialize: function() {
			// this.listenTo(this.model.user, 'change:author', this.renderUsername);
			this.listenTo(this.model.youtube.profile, 'change:items', this.renderUsername);
			this.listenTo(this.model.youtube.profile, 'load:client', function(){
				this.model.youtube.profile.getProfile();
			}, this);
			this.signinButton = new gsignin({
				el: this.$('.sign-in')[0],
				scopes: this.model.user.auth.scopes,
				clientId: this.model.user.getClientId()
			});
			this.listenTo(this.signinButton, 'auth:success', this.handleSignIn);
			this.faceId = setInterval(this.refershFacebookPage.bind(this), 4 * 60 * 60 * 1000);
			this.connect();
		},

		connect: function () {
			this.model.youtube.profile.connect();
		},

		handleSignIn: function(authResult){
			// TODO - update app.user iwth token and load relevant
			// client api's in relevant services:
			// load youtube v3 api, load user profile (same ProfileService?)
			this.connect();
			// Backbone.trigger('user:authorized' ,authResult);
		},

		renderUsername: function() {
			var profile = this.model.youtube.profile,
				imageUrl = '', 
				username = 'Username',
				isSignedIn = false;
			if (profile && profile.attributes.items) {
				imageUrl = 'url(' + profile.picture('high') + ')';
				username = profile.title();
				isSignedIn = true;
			}
			this.$('.icon-user').css('backgroundImage', imageUrl);
			this.$('.username').html(username);
			this.$el.toggleClass('user-signed-in', isSignedIn);
		},

		signOut: function(ev) {
			ev.preventDefault();
			this.disconnectUser();
		},

		disconnectUser: function(){
			var that = this;
			var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
			      gapi.auth.getToken().access_token;

			  // Perform an asynchronous GET request.
			  $.ajax({
			    type: 'GET',
			    url: revokeUrl,
			    async: false,
			    contentType: "application/json",
			    dataType: 'jsonp',
			    success: function(nullResponse) {
			    	that.model.youtube.profile.clear();
			      // Do something now that user is disconnected
			      // The response is always undefined.
			    },
			    error: function(e) {
			      // Handle the error
			      // console.log(e);
			      // You could point users to manually disconnect if unsuccessful
			      // https://plus.google.com/apps
			    }
			  });
		},

		refershFacebookPage: function(){
			var $fbPage = this.$('.facebook-page'),
				fbHtml = $fbPage.html();
			$fbPage.html(fbHtml);
		}

	});
   
	return {
		create: function(model){
			return new UserProfileManager({
				model: model
			});
		}
	};
});