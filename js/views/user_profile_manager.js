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

		url: {
			signin: "http://orizens.com/tools/services/examples/widget_authentication/widget/?",
			signout: "http://orizens.com/tools/services/examples/widget_authentication/mywebsite/index.php?"
		},
		
		signIn: function(ev) {
			ev.preventDefault();
			// var start_url = this.url.signin + "provider=google&return_to=http%3A%2F%2Forizens.com%2Ftools%2Fservices%2Fexamples%2Fwidget_authentication%2Fmywebsite%2Findex.php" + "&_ts=" + (new Date()).getTime();
			var start_url = this.url.signin + "provider=google&return_to=" + location.href + "&_ts=" + (new Date()).getTime();
			this.connect(start_url);
		},

		signOut: function() {
			ev.preventDefault();
			var start_url = this.url.signout + "logout=Google&_ts=" + (new Date()).getTime();
			this.connect(start_url);
		},

		connect: function(url) {
			window.open(
				url, 
				"hybridauth_social_sing_on", 
				"location=0,status=0,scrollbars=0,width=800,height=500"
			); 
		}

	});
   
	return UserProfileManager; 
});