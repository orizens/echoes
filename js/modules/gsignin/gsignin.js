define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	
	var view = Backbone.View.extend({
		initialize: function(options){
			var that = this;
			this.el.addEventListener('click', function(ev){
				ev.preventDefault();
				gapi.auth.authorize({
					client_id: options.clientId,
					scope: options.scopes,
					// false - is for showing pop up
					immediate: false, 
				}, function (authResult) {
					authResult ? 
						that.trigger('auth:success', authResult)
						: that.trigger('auth:error', authResult);
				});
			});
		}
	});
	
	return view;
});