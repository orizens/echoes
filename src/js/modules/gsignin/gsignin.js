var Backbone = require('backbonejs');

var view = Backbone.View.extend({
	initialize: function(options){
		var that = this;
		this.options = options;
		this.el.addEventListener('click', function(ev){
			ev.preventDefault();
			that.auth();
		});
	},

	auth: function () {
		var that = this;
		gapi.auth.authorize({
			client_id: this.options.clientId,
			scope: this.options.scopes,
			// false - is for showing pop up
			immediate: false, 
		}, function (authResult) {
			authResult ? 
				that.trigger('auth:success', authResult)
				: that.trigger('auth:error', authResult);
		});
	}
});

module.exports = view;