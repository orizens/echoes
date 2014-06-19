define([
	'jquery',
	'underscore',
	'backbone',
	'fb',
	'text!templates/facebook_like_tag.html'
], function($, _, Backbone, fbSdk, FacebookLikeTag) {
   
    var FacebookLikeView = Backbone.View.extend({
		el: '#facebook-like',

		template: _.template(FacebookLikeTag),

		initialize: function() {
			this.listenTo(this.model.youtube.info, 'change:id', this.render);
		},

		render: function() {
			var url = this.model.get('player').getShareUrl();
			this.$el.html( this.template({ url: url }) );
			if (FB) {
				FB.XFBML.parse(this.el);
			}
			return this;
		}
	});
   
    return FacebookLikeView;
});